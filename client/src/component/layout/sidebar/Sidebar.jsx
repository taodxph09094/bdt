import React, { useState, Fragment } from "react";
import Banner from "../Banner/Banner";
import Search from "../../Product/Search";
import { Link, useHistory } from "react-router-dom";

const categories = [
  "Điện thoại",
  "Laptop",
  "Máy tính bảng",
  "Tai nghe",
  "Loa",
  "Đồng hồ",
  "Phụ kiện",
  "Màn hình",
  "PC",
  "Thu cũ",
  "Hàng cũ",
];
const Sidebar = ({ match }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  let history = useHistory();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars" />
                <Link to="/products">
                  <span>Tất cả sản phẩm</span>
                </Link>
              </div>
              <ul>
                <li>
                  <Link to="#">Điện thoại</Link>
                </li>
                <li>
                  <Link to="#">Laptop</Link>
                </li>
                <li>
                  <Link to="#">Máy tính bảng</Link>
                </li>
                <li>
                  <Link to="#">Tai nghe</Link>
                </li>
                <li>
                  <Link to="#">Loa</Link>
                </li>
                <li>
                  <Link to="#">Đồng hồ</Link>
                </li>
                <li>
                  <Link to="#">Phụ kiện</Link>
                </li>
                <li>
                  <Link to="#">Màn hình</Link>
                </li>
                <li>
                  <Link to="#">PC</Link>
                </li>
                <li>
                  <Link to="#">Thu cũ</Link>
                </li>
                <li>
                  <Link to="#">Hàng cũ</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            {/* search */}
            {/* <Search /> */}
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#" onSubmit={searchSubmitHandler}>
                  <div className="hero__search__categories">
                    Tất cả sản phẩm
                    <span className="arrow_carrot-down" />
                  </div>
                  <input
                    type="text"
                    placeholder="Bạn muốn tìm gì ?"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="site-btn" value="Search">
                    Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="hero__search__phone__text">
                  <h5>+84 321 321 321</h5>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            <Banner />
            {/* banner */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
