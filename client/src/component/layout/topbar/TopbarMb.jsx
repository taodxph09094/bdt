import { Link } from "react-router-dom";
import { HiMail } from "react-icons/hi";
export default function TopbarMb() {
  const user = true;
  return (
    <>
      <div className="humberger__menu__overlay" />
      <div className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
          <a href="#">
            <img src="../../assets/img/logo.png" alt="" />
          </a>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-heart" /> <span>1</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-shopping-bag" /> <span>3</span>
              </a>
            </li>
          </ul>
          <div className="header__cart__price">
            Tổng tiền: <span>$150.00</span>
          </div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__language">
            <img src="../../assets/img/language.png" alt="" />
            <div>English</div>
            <span className="arrow_carrot-down" />
            <ul>
              <li>
                <a href="#">Spanis</a>
              </li>
              <li>
                <a href="#">English</a>
              </li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            <a href="#">
              <i className="fa fa-user" /> Đăng nhập
            </a>
          </div>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            <li className="active">
              <a href="./index.html">Trang chủ</a>
            </li>
            <li>
              <a href="./shop-grid.html">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Kiểm tra đơn</a>
            </li>
            <li>
              <a href="./contact.html">Liên hệ</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap" />
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
        <div className="humberger__menu__contact">
          <ul>
            <li>
              <HiMail /> hello@gmail.com
            </li>
            <li>Miễn phí ship với đơn hàng từ 20,000,000 đ</li>
          </ul>
        </div>
      </div>
    </>
  );
}
