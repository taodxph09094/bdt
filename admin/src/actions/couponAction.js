import axios from "axios";
import {
  ADMIN_COUPON_FAIL,
  ADMIN_COUPON_REQUEST,
  ADMIN_COUPON_SUCCESS,
  ALL_COUPON_FAIL,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/couponConstants";

export const getCoupon =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COUPON_REQUEST });

      let link = `/api/v1/coupons?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/coupons?keyword=${keyword}&page=${currentPage}`;
      }
      if (tag) {
        link = `/api/v1/coupons?keyword=${keyword}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_COUPON_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_COUPON_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All COUPONs For Admin
export const getAdminCoupon = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COUPON_REQUEST });

    const { data } = await axios.get("/api/v1/admin/coupons");
    console.log(data);
    dispatch({
      type: ADMIN_COUPON_SUCCESS,
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create COUPON
export const createCoupon = (coupon) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COUPON_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/coupon/new`,
      coupon,
      config
    );
    console.log(data);
    dispatch({
      type: NEW_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update COUPON
export const updateCoupon = (id, couponData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COUPON_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/coupon/${id}`,
      couponData,
      config
    );

    dispatch({
      type: UPDATE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete COUPON
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUPON_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/coupon/${id}`);

    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get COUPONs Details
export const getCouponDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/coupon/${id}`);

    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data.coupon,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
