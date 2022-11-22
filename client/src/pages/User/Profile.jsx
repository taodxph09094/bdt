import React, { Fragment, useState, useEffect } from "react";
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
import "./UpdateProfile.css";
import Loader from "../../component/layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Menu from "../../component/layout/Header/Menu";
import { Link } from "react-router-dom";
const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading, isAuthenticated } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Chỉnh sửa thành công");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <>
      <Menu />
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb.jpg"
        style={{
          backgroundImage: `url("img/breadcrumb.jpg")`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Thông tin tài khoản</h2>
                <div className="breadcrumb__option">
                  <a href="/">Home</a>
                  <span>Thông tin tài khoản</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container profile">
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
                    onSubmit={updateProfileSubmit}
                  >
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Họ và tên</label>
                          <Form.Control
                            defaultValue={name}
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
                            defaultValue={email}
                            placeholder={email}
                            required
                            disabled
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                            defaultValue={address}
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
                            defaultValue={phone}
                            placeholder={phone}
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right createAccount"
                      type="submit"
                      variant="info"
                    >
                      Chỉnh sửa
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image"></div>
                <Card.Body>
                  <div className="author">
                    <img src={avatarPreview} alt="Avatar Preview" />
                  </div>
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
                    onChange={updateProfileDataChange}
                    multiple
                  />
                </div>
                {/* <Button */}
                <div className="bonusBtn">
                  <Button variant="info">
                    <Link className="link-account" to="/orders">
                      Lịch sử mua hàng
                    </Link>
                  </Button>
                  <Button variant="secondary">
                    <Link className="link-account" to="/password/update">
                      Đổi mật khẩu
                    </Link>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
