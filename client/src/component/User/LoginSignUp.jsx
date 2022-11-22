import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
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
    <>
      <h2 className="titleLogin">Đăng nhập</h2>
      <form
        className="signUpForm"
        encType="multipart/form-data"
        onSubmit={loginSubmit}
      >
        <MDBContainer fluid className="p-5 my-5">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <h5 className="titleForm">Nhập địa chỉ Email</h5>
              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                type="email"
                size="lg"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <h5 className="titleForm">Nhập mật khẩu</h5>
              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                type="password"
                size="lg"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <Link to="/password/forgot">Quên mật khẩu ?</Link>
              </div>

              <MDBInput
                className="mb-4 w-100"
                size="lg"
                type="submit"
                value="Đăng nhập"
              />

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Hoặc</p>
              </div>
              <Link to="/register" className="link">
                <MDBBtn
                  className="w-100 mx-2"
                  size="lg"
                  outline
                  color="secondary"
                >
                  Đăng ký
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </>
  );
};

export default LoginSignUp;
