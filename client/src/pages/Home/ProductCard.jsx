import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { formatCurrency } from "../../utils/helper";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [pricePromotion, setPricePromotion] = useState();

  useEffect(() => {
    setPricePromotion(
      product.price - (product.price * product.promotion) / 100
    );
  });
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mix oranges ">
      <Link to={`/product/${product._id}`}>
        <div className="featured__item">
          <div
            className="featured__item__pic set-bg"
            style={{
              backgroundImage: `url(${product.images[0].url})`,
            }}
            // data-setbg="img/featured/feature-1.jpg"
          >
            <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <i className="fa fa-heart" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-retweet" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-shopping-cart" />
                </a>
              </li>
            </ul>
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">{product.name}</a>
            </h6>
            <h5>
              <span className="priceHome">
                {formatCurrency(`${pricePromotion}`) + " đ"}
              </span>
            </h5>
            <Rating {...options} /> <h5> ({product.numOfReviews} Đánh giá)</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
