import React, { useState, Fragment } from "react";
import Banner from "../Banner/Banner";
import Search from "../../Product/Search";
import { Link, useHistory } from "react-router-dom";

const categories = [
  "Apple",
  "Samsung",
  "Xiaomi Redmi",
  "Realmi",
  "Huawei",
  "OPPO",
  "Vivo",
  "Nokia",
  "ASUS",
  "Sony",
  "OnePlus",
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
                  <Link to="#">Applei</Link>
                </li>
                <li>
                  <Link to="#">Samsung</Link>
                </li>
                <li>
                  <Link to="#">Xiaomi Redmi</Link>
                </li>
                <li>
                  <Link to="#">Realmi</Link>
                </li>
                <li>
                  <Link to="#">Huawei</Link>
                </li>
                <li>
                  <Link to="#">OPPO</Link>
                </li>
                <li>
                  <Link to="#">Vivo</Link>
                </li>
                <li>
                  <Link to="#">Nokia</Link>
                </li>
                <li>
                  <Link to="#">ASUS</Link>
                </li>
                <li>
                  <Link to="#">Sony</Link>
                </li>
                <li>
                  <Link to="#">OnePlus</Link>
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
