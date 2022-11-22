import React from "react";

const BannerSmall = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="banner__pic">
              <img
                src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/Fold3-3699-rightbanner.png"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="banner__pic">
              <img
                src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/RightBanner_ipad%20m1%20desk.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSmall;
