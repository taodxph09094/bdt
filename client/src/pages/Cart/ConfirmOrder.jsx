import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Menu from "../../component/layout/Header/Menu";
import { formatCurrency } from "../../utils/helper";

function decimalNumber(num, n) {
  //num : số cần xử lý
  //n: số chữ số sau dấu phẩy cần lấy
  let base = 10 ** n;
  let result = Math.round(num * base) / base;
  return result;
}
const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const couponInfo = JSON.parse(sessionStorage.getItem("dataCartCoupon"));
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      item.quantity * item.price -
      (item.price * item.promotion) / 100 -
      couponInfo.coupon,
    0
  );
  const shippingCharges = subtotal > 20000000 ? 0 : 30000;
  const totalPrice = decimalNumber((subtotal + shippingCharges) / 23000, 2);
  const priceVND = subtotal + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <Menu />

      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin giao hàng</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên người tạo:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Sản phẩm trong giỏ:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X{" "}
                      {formatCurrency(
                        item.price - (item.price * item.promotion) / 100 + "",
                        0,
                        3,
                        ",",
                        "."
                      )}{" "}
                      đ = {/* <b>{item.price * item.quantity}</b>{" "} */}
                      <b>
                        {formatCurrency(
                          (item.price - (item.price * item.promotion) / 100) *
                            item.quantity +
                            "",
                          0,
                          3,
                          ",",
                          "."
                        )}{" "}
                        đ
                      </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Thông tin hóa đơn</Typography>
            <div>
              <div>
                <p>Tổng tiền:</p>
                {/* <span>{subtotal}</span> */}
                <span>{formatCurrency(subtotal + "", 0, 3, ",", ".")} đ</span>
              </div>
              <div>
                <p>Phí giao hàng:</p>
                <span>
                  {formatCurrency(shippingCharges + "", 0, 3, ",", ".")} đ
                </span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Thành tiền:</b>
              </p>
              <span>{formatCurrency(priceVND + "", 0, 3, ",", ".")} đ</span>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Tổng tiền sau khi quy đổi :</b>
              </p>
              <span>$ {totalPrice}</span>
              {/* <span>$ {decimalNumber(totalPrice / 23000, 2)}</span> */}
            </div>
            <button onClick={proceedToPayment}>Thanh toán </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
