import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <h2 className="titleLogin">Quên mật khẩu</h2>
            <div className="forgotForm">
              <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
              >
                <MDBRow>
                  <MDBCol md="8">
                    <MDBInput
                      wrapperClass="mb-4"
                      id="formControlLg"
                      type="email"
                      size="lg"
                      placeholder="Nhập email của bạn"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol md="4">
                    <MDBInput
                      className="mb-4 w-100"
                      size="lg"
                      type="submit"
                      value="Gửi"
                    />
                  </MDBCol>
                </MDBRow>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
