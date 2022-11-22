import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { formatCurrency } from "../../../utils/helper";
const Menu = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <a href="./">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li className="active">
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <Link to="/news">Tin tức</Link>
                </li>
                <li>
                  <Link to="#">Kiểm tra đơn</Link>
                  <ul class="header__menu__dropdown">
                    <li>
                      <Link to="/orders">Thanh toán Online</Link>
                    </li>
                    <li>
                      <Link to="./ordersSys">Thanh toán tiền mặt</Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/orders">Kiểm tra đơn </Link>
                </li> */}
                <li>
                  <Link to="./contact">Liên hệ</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li>
                  <Link to="#">
                    <i className="fa fa-heart" /> <span>1</span>
                  </Link>
                </li>
                <li>
                  <a href="/cart">
                    <i className="fa fa-shopping-bag" />{" "}
                    <span>{cartItems.length}</span>
                  </a>
                </li>
              </ul>
              <div className="header__cart__price">
                Tổng tiền:{" "}
                <span>
                  {formatCurrency(
                    `${cartItems.reduce(
                      (acc, item) =>
                        acc +
                        item.quantity * item.price -
                        (item.price * item.promotion) / 100,
                      0
                    )}`
                  )}{" "}
                  đ
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </>
  );
};

export default Menu;
