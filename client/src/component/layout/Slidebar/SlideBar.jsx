import React from "react";
import Slide from "./Slide";
const SlideBar = () => {
  return (
    <>
      {/* <Slide /> */}
      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="categories__slider owl-carousel">
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg="img/categories/cat-1.jpg"
                  style={{
                    backgroundImage: `url("img/categories/cat-1.jpg")`,
                  }}
                >
                  <h5>
                    <a href="#">Fresh Fruit</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg="img/categories/cat-2.jpg"
                  style={{
                    backgroundImage: `url("img/categories/cat-1.jpg")`,
                  }}
                >
                  <h5>
                    <a href="#">Dried Fruit</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg="img/categories/cat-3.jpg"
                  style={{
                    backgroundImage: `url("img/categories/cat-1.jpg")`,
                  }}
                >
                  <h5>
                    <a href="#">Vegetables</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg="img/categories/cat-4.jpg"
                  style={{
                    backgroundImage: `url("img/categories/cat-1.jpg")`,
                  }}
                >
                  <h5>
                    <a href="#">drink fruits</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg="img/categories/cat-5.jpg"
                  style={{
                    backgroundImage: `url("img/categories/cat-1.jpg")`,
                  }}
                >
                  <h5>
                    <a href="#">drink fruits</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideBar;
