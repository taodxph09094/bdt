import React, { Fragment, useEffect, useState } from "react";
import Menu from "../../component/layout/Header/Menu";
import Carousel from "react-material-ui-carousel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  getProductByName,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Review from "./Review";
import { useAlert } from "react-alert";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { addItemsToCart } from "../../actions/cartAction";
import { formatCurrency } from "../../utils/helper";
import ProductCard from "./ProductCard";

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { products } = useSelector((state) => state.products);

  const keyword = product.productLine;
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("");
  // const [pricePromotion, setPricePromotion] = useState();
  const increaseQuantity = () => {
    if (product.Stock <= quantity)
      return alert.error(`Bạn chỉ có thể chọn ${product.Stock} sản phẩm`);

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Đã thêm sản phẩm vào giỏ");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đánh giá thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
    dispatch(getProductByName(keyword));
  }, [dispatch, match.params.id, error, alert, reviewError, success, keyword]);

  return (
    <>
      {/* <Loader /> */}

      <Menu />
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="product__details__pic__item--large"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <Rating
                  name="hover-feedback"
                  value={product.ratings}
                  precision={0.5}
                />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Đánh giá)
                </span>
                <h3>
                  {product.name} {color}
                </h3>
                <div className="row ">
                  <div className="col-lg-1 col-md-1 col-sm-1">
                    <div
                      className={
                        color === "Đen" ? "chooseColorActive" : "chooseColor"
                      }
                      onClick={() => setColor("Đen")}
                    >
                      <div className="colorPhoneBlack"></div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1">
                    <div
                      className={
                        color === "Trắng" ? "chooseColorActive" : "chooseColor"
                      }
                      onClick={() => setColor("Trắng")}
                    >
                      <div className="colorPhoneWhite"></div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1">
                    <div
                      className={
                        color === "Vàng" ? "chooseColorActive" : "chooseColor"
                      }
                      onClick={() => setColor("Vàng")}
                    >
                      <div className="colorPhoneGold"></div>
                    </div>
                  </div>
                </div>
                <h4 className="priceHhh">
                  <del>
                    {product.promotion == 0 ? (
                      <p></p>
                    ) : (
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)
                      // formatCurrency(product.price) + " đ"
                    )}
                  </del>
                </h4>
                <div className="product__details__price">
                  {/* {formatCurrency(
                    `${
                      product.price - (product.price * product.promotion) / 100
                    }`
                  )}{" "}
                  đ */}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    product.price - (product.price * product.promotion) / 100
                  )}
                </div>
                {product.Stock == 0 ? (
                  <div className="">Sản phẩm này đã hết hàng</div>
                ) : (
                  <>
                    <div className="product__details__quantity">
                      <div className="quantity">
                        <div className="pro-qty">
                          <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="primary-btn"
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Thêm vào giỏ
                    </button>
                  </>
                )}

                <a href="#" className="heart-icon">
                  <span className="icon_heart_alt" />
                </a>
                <button className="primary-btn" onClick={submitReviewToggle}>
                  Bình luận ( đánh giá )
                </button>

                <h3>Sản phẩm tương tự</h3>
                <div className="cardProductLine">
                  <div className="row ">
                    {products &&
                      products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                  </div>
                </div>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Xác nhận</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />

                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Hủy
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Xác nhận
                    </Button>
                  </DialogActions>
                </Dialog>
                <ul>
                  <li>
                    <b>Availability</b> <span>In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b>{" "}
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Weight</b> <span>0.5 kg</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Mô tả sản phẩm
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                      aria-selected="false"
                    >
                      Cấu hình chi tiết
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                      aria-selected="false"
                    >
                      Đánh giá <span>(1)</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    {/* <ProductDesc />  */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${product.description}`,
                      }}
                    ></div>
                  </div>
                  <div className="tab-pane " id="tabs-2" role="tabpanel">
                    {/* <ProductInfo /> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${product.info}`,
                      }}
                    ></div>
                  </div>
                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    {/* <ProductReview /> */}
                    {product.reviews && product.reviews[0] ? (
                      <div className="reviews">
                        {product.reviews &&
                          product.reviews.map((review) => (
                            <Review key={review._id} review={review} />
                          ))}
                      </div>
                    ) : (
                      <p className="noReviews">Không có đánh giá</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
