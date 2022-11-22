import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";
import Menu from "../../component/layout/Header/Menu";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/helper";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Menu />
          <div>
            <section
              className="breadcrumb-section set-bg bg-color"
              data-setbg="img/breadcrumb.jpg"
              style={{
                backgroundImage: `url("img/breadcrumb.jpg")`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                      <h2>Chi tiết đơn hàng</h2>
                      <div className="breadcrumb__option">
                        <a href="/">Trang chủ</a>
                        <span>Chi tiết đơn hàng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="container">
            <Card className="cardOrders">
              <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                  <Typography component="h1">
                    Hóa đơn #{order && order._id}
                  </Typography>
                  <Typography>Thông tin giao hàng</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Tên người tạo:</p>
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
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Trạng thái thanh toán</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
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
                          ? "Đã thanh toán"
                          : "Thanh toán lỗi"}
                      </p>
                    </div>

                    <div>
                      <p>Giá :</p>
                      <span>$ {order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Trạng thái đơn hàng</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus &&
                          order.orderStatus === "Đã giao hàng"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="orderDetailsCartItems">
                  <Typography>Số lượng đơn:</Typography>
                  <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X{" "}
                            {formatCurrency(item.price + "", 0, 3, ",", ".") +
                              "đ"}{" "}
                            ={" "}
                            <b>
                              {/* {item.price * item.quantity} */}
                              {formatCurrency(
                                item.price * item.quantity + "",
                                0,
                                3,
                                ",",
                                "."
                              ) + "đ"}{" "}
                            </b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
