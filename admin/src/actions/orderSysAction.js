import axios from "axios";
import {
  ALL_ORDEROFFS_SUCCESS,
  CREATE_ORDEROFF_REQUEST,
  ALL_ORDEROFFS_REQUEST,
  ALL_ORDEROFFS_FAIL,
  UPDATE_ORDEROFF_REQUEST,
  UPDATE_ORDEROFF_SUCCESS,
  UPDATE_ORDEROFF_FAIL,
  DELETE_ORDEROFF_REQUEST,
  DELETE_ORDEROFF_SUCCESS,
  DELETE_ORDEROFF_FAIL,
  ORDEROFF_DETAILS_REQUEST,
  ORDEROFF_DETAILS_SUCCESS,
  ORDEROFF_DETAILS_FAIL,
  CLEAR_ERRORS,
  CREATE_ORDEROFF_SUCCESS,
  CREATE_ORDEROFF_FAIL,
  MY_ORDEROFFS_REQUEST,
  MY_ORDEROFFS_SUCCESS,
  MY_ORDEROFFS_FAIL,
} from "./../constants/orderSysConstants";

// Create Order
export const createOrder = (orderSystem) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDEROFF_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/orderSys/new",
      orderSystem,
      config
    );

    dispatch({
      type: CREATE_ORDEROFF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDEROFF_FAIL,
      payload: error.response.data.message,
    });
  }
};
// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDEROFFS_REQUEST });

    const { data } = await axios.get("/api/v1/ordersSys/me");

    dispatch({ type: MY_ORDEROFFS_SUCCESS, payload: data.ordersSystem });
  } catch (error) {
    dispatch({
      type: MY_ORDEROFFS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get All Orders (admin)
export const getOrderSystem =
  (monAndDate = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDEROFFS_REQUEST });
      let link = `/api/v1/admin/ordersSystem?monAndDate=${monAndDate}`;
      const { data } = await axios.get(link);

      dispatch({ type: ALL_ORDEROFFS_SUCCESS, payload: data });
      // console.log(data);
    } catch (error) {
      dispatch({
        type: ALL_ORDEROFFS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Order
export const updateOrderSystem = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDEROFF_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/ordersSystem/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDEROFF_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDEROFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrderSystem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDEROFF_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/ordersSystem/${id}`);

    dispatch({ type: DELETE_ORDEROFF_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDEROFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderSysDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDEROFF_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/ordersSystem/detail/${id}`);

    dispatch({ type: ORDEROFF_DETAILS_SUCCESS, payload: data.orderSystem });
  } catch (error) {
    dispatch({
      type: ORDEROFF_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
