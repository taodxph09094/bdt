import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { name, email, password, phone, address } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("phone", phone);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <MDBContainer fluid className="p-4">
          <MDBRow>
            <MDBCol
              md="6"
              className="text-center text-md-start d-flex flex-column justify-content-center"
            >
              <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>

              <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </MDBCol>

            <MDBCol md="6">
              <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <MDBCard className="my-5">
                  <MDBCardBody className="p-5">
                    <MDBRow>
                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          type="text"
                          placeholder="Họ tên"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                      </MDBCol>

                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          type="password"
                          placeholder="Mật khẩu"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass="mb-4"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      type="text"
                      placeholder="số điện thoại"
                      required
                      name="phone"
                      value={phone}
                      onChange={registerDataChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      type="text"
                      placeholder="địa chỉi"
                      required
                      name="address"
                      value={address}
                      onChange={registerDataChange}
                    />
                    <div id="registerImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <MDBInput
                        wrapperClass="mb-4"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Tôi đồng ý với mọi điều khoản"
                      />
                    </div>

                    <MDBInput
                      wrapperClass="mb-4"
                      type="submit"
                      value="Đăng ký"
                      className="signUpBtn"
                    />
                    {/* <MDBBtn
                      className="mb-4 w-100"
                      size="lg"
                      type="submit"

                    >
                      Đăng ký
                    </MDBBtn> */}
                    <div className="text-center">
                      <p>hoặc đăng nhập khi đã có tài khoản</p>
                      <Link to="/login" className="link">
                        <MDBBtn
                          className="w-100 mx-2"
                          size="lg"
                          outline
                          color="secondary"
                        >
                          Đăng nhập
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Register;
