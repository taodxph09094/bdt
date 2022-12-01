import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Sidebar = ({ newFeed }) => {
  const cate = ["Tin tức", "Công nghệ", "Đời sống"];
  const [keyword, setKeyword] = useState("");
  let history = useHistory();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/newFeeds/${keyword}`);
    } else {
      history.push("/newFeeds");
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
              {cate &&
                cate.map((newFeed) => (
                  <li>
                    <a href="#">{newFeed}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
