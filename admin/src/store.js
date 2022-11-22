import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
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
  allBrandReducer,
  newBrandReducer,
  brandReducer,
} from "./reducers/brandReducer";
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
import {
  allFeedbackReducer,
  newFeedbackReducer,
  feedbackReducer,
  feedbackDetailsReducer,
} from "./reducers/feedbackReducer";
import {
  newStatisticalReducer,
  statisticalDetailsReducer,
  statisticalReducer,
  statisticalsReducer,
} from "./reducers/statisticalReducer";
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
  newProduct: newProductReducer,
  newReview: newReviewReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  products: productsReducer,
  review: reviewReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allBrand: allBrandReducer,
  newBrand: newBrandReducer,
  brand: brandReducer,
  newNewFeed: newNewFeedReducer,
  newFeedDetails: newFeedDetailsReducer,
  newFeed: newFeedReducer,
  newFeeds: newFeedsReducer,
  newCoupon: newCouponReducer,
  couponDetails: couponDetailsReducer,
  coupon: couponReducer,
  coupons: couponsReducer,
  newStatistical: newStatisticalReducer,
  statisticalDetails: statisticalDetailsReducer,
  statistical: statisticalReducer,
  statisticals: statisticalsReducer,
  allFeedback: allFeedbackReducer,
  newFeedback: newFeedbackReducer,
  feedback: feedbackReducer,
  feedbackDetails: feedbackDetailsReducer,
  newOrderSystem: newOrderSysReducer,
  orderSystemDetails: orderSysDetailsReducer,
  allOrderSystem: allOrdersSysReducer,
  orderSystem: orderSysReducer,
  myOrdersSys: myOrdersSysReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shipingInfo: localStorage.getItem("shipingInfo")
      ? JSON.parse(localStorage.getItem("shipingInfo"))
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
