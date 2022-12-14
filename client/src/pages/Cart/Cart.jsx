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
      }, setShippingPrice(cartItems.reduce((acc, item) => acc + item.quantity * item.price - (item.price * item.promotion) / 100, 0) >= 20000000 ? 0 : 30000));
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
                <h2>Gi??? h??ng</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang ch???</a>
                  <span>gi???</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng</Typography>
          <Link to="/products">Xem c??c s???n ph???m kh??c</Link>
        </div>
      ) : (
        <section className="shoping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__table">
                  <div className="cartHeader">
                    <p>Th??ng tin </p>
                    <p>S??? l?????ng</p>
                    <p>T???ng ti???n</p>
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
                          ??
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
                    Ti???p t???c mua h??ng
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__continue">
                  <div className="shoping__discount">
                    <h5>Nh???p m?? gi???m gi??</h5>
                    <form action="#" onSubmit={btnAddCoupon}>
                      <input
                        type="text"
                        onChange={(e) => setValueCoupon(e.target.value)}
                        placeholder="Vui l??ng nh???p m?? gi???m gi??"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shoping__checkout">
                  <h5>H??a ????n</h5>
                  <p>
                    V???i m???i h??a ????n c?? tr??? gi?? l???n h??n 20,000,000 ?? s??? ???????c mi???n
                    ph?? giao h??ng
                  </p>
                  <ul>
                    <li>
                      TI???n ship{" "}
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
                        ??
                      </span>
                    </li>
                    <li>
                      M?? gi???m gi??{" "}
                      <span>
                        {/* {coupon} */}
                        {formatCurrency(coupon + "", 0, 3, ",", ".") + " ??"}
                      </span>
                    </li>
                    <li>
                      T???ng ti???n{" "}
                      <span>
                        {/* {totalPrice > coupon
                          ? formatCurrency(
                              `${totalPrice + shippingPrice}`
                            )
                          : formatCurrency(
                              `${totalPrice + shippingPrice}`
                            )}{" "} */}
                        <del className="priceFirst">
                          {coupon > 0 &&
                            formatCurrency(
                              cartItems.reduce(
                                (acc, item) =>
                                  acc +
                                  (item.quantity * item.price -
                                    (item.price * item.promotion) / 100),
                                0
                              ) + "",
                              0,
                              3,
                              ",",
                              "."
                            ) + " ??"}
                        </del>
                        {formatCurrency(`${totalPrice + shippingPrice}`)} ??
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
                      Thanh to??n qua th???
                    </Button>
                    <Button
                      variant="info"
                      className=" paymentCash"
                      onClick={checkoutCash}
                    >
                      <BsCashCoin className="creditIcon" />
                      Thanh to??n ti???n m???t
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
