import React, { useRef, Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../actions/orderSysAction";
import Menu from "../../component/layout/Header/Menu";
import { CREATE_ORDER_SUCCESS } from "../../constants/orderSysConstants";
import { formatCurrency } from "../../utils/helper";

const OrderCash = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.newOrderSystem);
  const couponInfo = JSON.parse(sessionStorage.getItem("dataCartCoupon"));
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [note, setNote] = useState("");
  let today = new Date();
  const dateFindData =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      item.quantity * item.price -
      (item.price * item.promotion) / 100 -
      couponInfo.coupon,
    0
  );

  const shippingCharges = subtotal > 20000000 ? 0 : 30000;
  const totalPrice = subtotal + shippingCharges;

  const order = {
    name: name,
    phone: phone,
    email: email,
    address: address,
    note: note,
    orderItems: cartItems,
    itemsPrice: subtotal,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
    dateFind: dateFindData,
  };
  console.log(order);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Tạo đơn hàng thành công");
      history.push("/");
      dispatch({ type: CREATE_ORDER_SUCCESS });
    }
  }, [dispatch, alert, error, history, success]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
  };
  return (
    <>
      <Menu />
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb.jpg"
        style={{
          backgroundImage: `url("img/breadcrumb.jpg")`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Nhập thông tin</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang chủ</a>
                  <span>Nhập thông tin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                <span className="icon_tag_alt" /> Nếu bạn có mã giảm giá,{" "}
                <a href="./cart">hãy ấn vào đây</a> để nhập
              </h6>
            </div>
          </div>
          <div className="checkout__form">
            <h4>Chi tiết đơn hàng</h4>
            <form action="#" onSubmit={submitHandler}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Họ tên<span>*</span>
                        </p>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Số điện thoại<span>*</span>
                        </p>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Địa chỉ email<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Địa chỉ<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Ghi chú<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Đơn hàng của bạn</h4>
                    <div className="checkout__order__products">
                      Sản phẩm <span>Giá tiền</span>
                    </div>
                    <ul>
                      {cartItems &&
                        cartItems.map((item) => (
                          <li key={item.product}>
                            {item.name} x {item.quantity}
                            <span>
                              <b>
                                {formatCurrency(
                                  (item.price -
                                    (item.price * item.promotion) / 100) *
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
                          </li>
                        ))}
                    </ul>
                    <div className="checkout__order__subtotal">
                      Tổng tiền:{" "}
                      <span>
                        {formatCurrency(subtotal + "", 0, 3, ",", ".")} đ
                      </span>
                    </div>
                    <div className="checkout__order__total">
                      Phí giao hàng{" "}
                      <span>
                        {formatCurrency(shippingCharges + "", 0, 3, ",", ".")} đ
                      </span>
                    </div>
                    <div className="checkout__order__total">
                      Thành tiền:{" "}
                      <span>
                        {formatCurrency(totalPrice + "", 0, 3, ",", ".")} đ
                      </span>
                    </div>
                    <button type="submit" className="site-btn">
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderCash;
