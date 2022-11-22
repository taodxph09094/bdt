import React from "react";
import { useAlert } from "react-alert";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userAction";
const Topbar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    alert.success("Đăng xuất thành công");
  };
  return (
    <>
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope" /> hello@gmail.com
                  </li>
                  <li>Miễn phí ship với đơn hàng từ 20,000,000 đ</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest-p" />
                  </a>
                </div>
                <div className="header__top__right__auth">
                  {user && (
                    <Link className="link" onClick={handleLogout}>
                      <i className="fa fa-user" />
                      Đăng xuất
                    </Link>
                  )}
                </div>
                {user ? (
                  <p></p>
                ) : (
                  <div className="header__top__right__auth">
                    <Link className="link" to="/login">
                      <i className="fa fa-user" />
                      Đăng nhập
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
