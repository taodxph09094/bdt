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
import {
  clearErrors,
  updateProfile,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "../../constants/userConstants";
import Menu from "../../component/layout/Header/Menu";
import { Link } from "react-router-dom";
const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Đổi mật khẩu thành công");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
  return (
    <>
      <Menu />

      <div className="container profile">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Đổi mật khẩu</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
              <Col className="pr-1" md="5">
                <Form.Group>
                  <label>Nhập mật khẩu cũ</label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Nhập mật khẩu cũ"
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label>Nhập mật khẩu mới</label>
                  <Form.Control
                    placeholder="Nhập mật khẩu mới"
                    required
                    // disabled
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label>Nhập lại mật khẩu mới</label>
                  <Form.Control
                    placeholder="Nhập mật khẩu mới"
                    required
                    // disabled
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Button
                className="btn-fill pull-right createAccount"
                type="submit"
                variant="info"
              >
                Đổi mật khẩu
              </Button>
              <div className="clearfix"></div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ChangePassword;
