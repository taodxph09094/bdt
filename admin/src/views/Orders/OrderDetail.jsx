import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Button from "react-bootstrap/esm/Button";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { formatCurrency } from "../../utils/helper";
import "./orderDetail.css";
function decimalNumber(num, n) {
  //num : số cần xử lý
  //n: số chữ số sau dấu phẩy cần lấy
  let base = 10 ** n;
  let result = Math.round(num * base) / base;
  return result;
}
const OrderDetail = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Cập nhật trạng thái đơn thành công");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <>
      <div className="dashboard">
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Thông tin giao hàng</Typography>
                  <div className="confirmshippingAreaBox">
                    <div>
                      <p>Tên người nhân:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>
                        {" "}
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Trạng thái đơn hàng</Typography>
                  <div>
                    <div className="confirmshippingAreaBox">
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                    <Typography>Trạng thái thanh toán</Typography>
                    <div>
                      <div className="confirmshippingAreaBox">
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Sản phẩm trong giỏ:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X{" "}
                            {formatCurrency(item.price + "", 0, 3, ",", ".")} đ
                            ={" "}
                            <b>
                              {formatCurrency(
                                item.price * item.quantity + "",
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
                      <p>Tổng tiền :</p>
                      <span>
                        {formatCurrency(
                          order.totalPrice * 23000 + "",
                          0,
                          3,
                          ",",
                          "."
                        )}{" "}
                        đ
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h3>Cập nhật đơn hàng</h3>
                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Chọn trạng thái</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Thực hiện
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
