import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
    <>
      <div className="col-lg-4 col-md-4 col-sm-6 ">
        <Link to={`/product/${product._id}`}>
          <div className="featured__item cardLine">
            <img className="imageProductLine" src={product.images[0].url} />
            <div className="featured__item__text">
              <h6>
                <a href="#">{product.name}</a>
              </h6>
              <h5>
                <span className="priceHome">
                  {formatCurrency(`${pricePromotion}`) + " đ"}
                </span>
              </h5>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
