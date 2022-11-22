import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
import {
  allOrdersSysReducer,
  newOrderSysReducer,
  orderSysDetailsReducer,
  orderSysReducer,
  myOrdersSysReducer,
} from "./reducers/orderSysReducer";
import {
  allFeedbackReducer,
  newFeedbackReducer,
  feedbackReducer,
} from "./reducers/feedbackReducer";
import {
  newNewFeedReducer,
  newFeedDetailsReducer,
  newFeedReducer,
  newFeedsReducer,
} from "./reducers/newFeedReducer";
import {
  newCouponReducer,
  couponDetailsReducer,
  couponReducer,
  couponsReducer,
} from "./reducers/couponReducer";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  newOrderSystem: newOrderSysReducer,
  orderSystemDetails: orderSysDetailsReducer,
  allOrderSystem: allOrdersSysReducer,
  orderSystem: orderSysReducer,
  myOrdersSys: myOrdersSysReducer,
  allFeedback: allFeedbackReducer,
  newFeedback: newFeedbackReducer,
  feedback: feedbackReducer,
  newNewFeed: newNewFeedReducer,
  newFeedDetails: newFeedDetailsReducer,
  newFeed: newFeedReducer,
  newFeeds: newFeedsReducer,
  newCoupon: newCouponReducer,
  couponDetails: couponDetailsReducer,
  coupon: couponReducer,
  coupons: couponsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
