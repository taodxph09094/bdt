import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";
import Menu from "../../component/layout/Header/Menu";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/helper";
import { clearErrors, getOrderSysDetails } from "../../actions/orderSysAction";

const OrderDetailSys = ({ match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.orderSystemDetails
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderSysDetails(match.params.id));
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
                      <span>{order.phone}</span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>{order.address}</span>
                    </div>
                    <div>
                      <p>Ghi chú:</p>
                      <span>{order.note}</span>
                    </div>
                  </div>
                  <Typography>Trạng thái thanh toán</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Giá :</p>
                      <span>
                        {formatCurrency(order.totalPrice + "", 0, 3, ",", ".")}{" "}
                        đ
                      </span>
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

export default OrderDetailSys;
