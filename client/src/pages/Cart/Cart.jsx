import React, { Fragment, useEffect, useState } from "react";
import Menu from "../../component/layout/Header/Menu";
import Loader from "../../component/layout/Loader/Loader";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { MDBBtn } from "mdb-react-ui-kit";
import "./cart.css";
import Button from "react-bootstrap/esm/Button";
import { formatCurrency } from "../../utils/helper";
import { BsCreditCard2Back, BsCashCoin } from "react-icons/bs";
import { getCoupon } from "../../actions/couponAction";

const Cart = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { coupons } = useSelector((state) => state.coupons);
  const [coupon, setCoupon] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");
  const [valueCoupon, setValueCoupon] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  // const shippingCharges = subtotal > 20000000 ? 0 : 30000;
  const dispatch = useDispatch();
  const btnAddCoupon = () => {
    // setCoupon(valueCoupon);
  };
  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch, alert, history]);
  console.log(coupon);
  useEffect(() => {
    // dispatch(getCoupon());
    if (valueCoupon === "GIAMGIA1") {
      setCoupon(50000);
    } else if (valueCoupon === "GIAMGIA2") {
      setCoupon(5000000);
    } else {
      setCoupon(0);
    }
    cartItems &&
      cartItems.map((item) => {
        totalPrice > coupon
          ? setTotalPrice(
              cartItems.reduce(
                (acc, item) =>
                  acc +
                  (item.quantity * item.price -
                    (item.price * item.promotion) / 100) -
                  coupon,
                0
              )
            )
          : setTotalPrice(
              cartItems.reduce(
                (acc, item) =>
                  acc +
                  (item.quantity * item.price -
                    (item.price * item.promotion) / 100),
                0
              )
            );
      }, setShippingPrice(cartItems.reduce((acc, item) => acc + item.quantity * item.price - (item.price * item.promotion) / 100, 0) > 20000000 ? 0 : 30000));
  });
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    const dataCart = {
      coupon,
    };
    sessionStorage.setItem("dataCartCoupon", JSON.stringify(dataCart));
    history?.push("/login?redirect=shipping");
  };
  const checkoutCash = () => {
    const dataCart = {
      coupon,
    };
    sessionStorage.setItem("dataCartCoupon", JSON.stringify(dataCart));
    history?.push("/login?redirect=orderCash");
  };
  return (
    <>
      <Loader />
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
                <h2>Giỏ hàng</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang chủ</a>
                  <span>giỏ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>Không có sản phẩm nào trong giỏ hàng</Typography>
          <Link to="/products">Xem các sản phẩm khác</Link>
        </div>
      ) : (
        <section className="shoping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__table">
                  <div className="cartHeader">
                    <p>Thông tin </p>
                    <p>Số lượng</p>
                    <p>Tổng tiền</p>
                  </div>

                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="cartContainer" key={item.product}>
                        <CartItem
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                        <div className="cartInput">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                          >
                            -
                          </button>
                          <p class="quantityItem" style={{ margin: "10px" }}>
                            {item.quantity}{" "}
                          </p>
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="cartSubtotal">
                          {/* {`${
                          item.price * item.quantity
                        }`} */}
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
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__btns">
                  <Link to="/products" className="primary-btn cart-btn link">
                    Tiếp tục mua hàng
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__continue">
                  <div className="shoping__discount">
                    <h5>Nhập mã giảm giá</h5>
                    <form action="#" onSubmit={btnAddCoupon}>
                      <input
                        type="text"
                        onChange={(e) => setValueCoupon(e.target.value)}
                        placeholder="Vui lòng nhập mã giảm giá"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__checkout">
                  <h5>Hóa đơn</h5>
                  <p>
                    Với mỗi hóa đơn có trị giá lớn hơn 20,000,000 đ sẽ được miễn
                    phí giao hàng
                  </p>
                  <ul>
                    <li>
                      TIền ship{" "}
                      <span>
                        {formatCurrency(
                          `${
                            // cartItems.reduce(
                            //   (acc, item) =>
                            //     acc +
                            //     item.quantity * item.price -
                            //     (item.price * item.promotion) / 100,
                            //   0
                            // ) > 20000000
                            //   ? 0
                            //   : 30000
                            shippingPrice
                          }`
                        )}{" "}
                        đ
                      </span>
                    </li>
                    <li>
                      Mã giảm giá{" "}
                      <span>
                        {valueCoupon}
                        {/* {formatCurrency(coupon + "", 0, 3, ",", ".") + " đ"} */}
                      </span>
                    </li>
                    <li>
                      Tổng tiền{" "}
                      <span>
                        {/* {totalPrice > coupon
                          ? formatCurrency(
                              `${totalPrice + shippingPrice}`
                            )
                          : formatCurrency(
                              `${totalPrice + shippingPrice}`
                            )}{" "} */}
                        {formatCurrency(`${totalPrice + shippingPrice}`)} đ
                      </span>
                    </li>
                  </ul>
                  <div className="viewBtn">
                    <Button
                      variant="success"
                      onClick={checkoutHandler}
                      className="paymentCard"
                    >
                      <BsCreditCard2Back className="creditIcon" />
                      Thanh toán qua thẻ
                    </Button>
                    <Button
                      variant="info"
                      className=" paymentCash"
                      onClick={checkoutCash}
                    >
                      <BsCashCoin className="creditIcon" />
                      Thanh toán tiền mặt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
