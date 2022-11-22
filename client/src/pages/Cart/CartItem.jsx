import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import "./cart.css";
const CartItem = ({ item, deleteCartItems }) => {
  const [pricePromotion, setPricePromotion] = useState();

  useEffect(() => {
    setPricePromotion(item.price - (item.price * item.promotion) / 100);
  });
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="ssa" />
        <div>
          <Link to={`/product/${item.product}`} className="nameProductCart">
            {item.name}
          </Link>
          <span>Giá : {formatCurrency(`${pricePromotion}`) + " đ"}</span>
          <p onClick={() => deleteCartItems(item.product)}>Xóa</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
