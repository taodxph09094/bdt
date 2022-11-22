import React, { useState } from "react";

const Sidebar = ({ newFeed, history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/news/${keyword}`);
    } else {
      history.push("/news");
    }
  };
  return (
    <>
      <div className="col-lg-4 col-md-5">
        <div className="blog__sidebar">
          <div className="blog__sidebar__search">
            <form action="#" onSubmit={searchSubmitHandler}>
              <input type="text" placeholder="Tìm kiếm..." />
              <button type="submit">
                <span className="icon_search" />
              </button>
            </form>
          </div>
          <div className="blog__sidebar__item">
            <h4>Danh mục</h4>
            <ul>
              <li>
                <a href="#">Tất cả</a>
              </li>
              <li>
                <a href="#">{newFeed.category}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
