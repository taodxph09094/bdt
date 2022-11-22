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
import { REGISTER_USER_SUCCESS } from "../../constants/userConstansts";
import { clearErrors, register } from "../../actions/userAction";
import { useSelector } from "react-redux";
const CreateUser = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const permission = ["Admin", "Manager", "User"];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Tạo tài khoản thành công");
      history.push("/admin/users");
      dispatch({ type: REGISTER_USER_SUCCESS });
    }
  }, [dispatch, alert, error, history, success]);
  const createUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("role", role);
    myForm.set("phone", phone);
    myForm.set("address", address);
    avatar.forEach((image) => {
      myForm.append("avatar", image);
    });
    dispatch(register(myForm));
  };
  const createUserImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setAvatar([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setAvatar((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tạo tài khoản mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={createUserSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Họ và tên</label>
                        <Form.Control
                          defaultValue={name}
                          //   disabled
                          placeholder="Nhập họ tên"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Form.Control
                          placeholder="Nhập địa chỉ email"
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
                          placeholder="Nhập mật khẩu"
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
                          placeholder="Nhập lại mật khẩu"
                          type="password"
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
                          //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
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
                          //   defaultValue="Mike"
                          placeholder="Số điện thoại"
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
                          <option value="">Chọn quyền</option>
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
                  >
                    Tạo tài khoản mới
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="User Preview" />
                    ))}
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <input
                  type="file"
                  name="avatar"
                  className="inputImageProduct"
                  // style="position:relative;overflow:hidden"
                  // name="avatar"
                  accept="image/*"
                  onChange={createUserImagesChange}
                  multiple
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
