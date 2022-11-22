import React, { useState, Fragment } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
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
  );
};

export default Search;
