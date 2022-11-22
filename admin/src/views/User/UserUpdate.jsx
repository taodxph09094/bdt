import React, { useEffect, useState } from "react";
import "./style.css";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constants/userConstansts";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import { useSelector } from "react-redux";
const UserUpdate = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const permission = ["Admin", "Manager", "User"];
  const userId = match.params.id;
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword(user.password);
      setPhone(user.phone);
      setAddress(user.address);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Chỉnh sửa tài khoản thành công");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("role", role);
    myForm.set("phone", phone);
    myForm.set("address", address);
    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Chỉnh sửa thông tin tài khoản</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={updateUserSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Họ và tên</label>
                        <Form.Control
                          // defaultValue={name}
                          //   disabled
                          required
                          placeholder={name}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Form.Control
                          placeholder={email}
                          required
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Mật khẩu</label>
                        <Form.Control
                          //   defaultValue="Mike"
                          required
                          placeholder={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Nhập lại mật khẩu</label>
                        <Form.Control
                          //   defaultValue="Andrew"
                          placeholder={password}
                          type="password"
                          required
                          //   onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Địa chỉ hiện tại</label>
                        <Form.Control
                          required
                          //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder={address}
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Số điện thoại</label>
                        <Form.Control
                          required
                          //   defaultValue="Mike"
                          placeholder={phone}
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Quyền người dùng</label>
                        <Form.Select
                          className="select-category"
                          aria-label="Default select example"
                          defaultValue={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            Chọn quyền
                          </option>
                          {permission.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right createAccount"
                    type="submit"
                    variant="info"
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Chỉnh sửa
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserUpdate;
