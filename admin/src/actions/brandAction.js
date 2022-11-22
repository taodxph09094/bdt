import axios from "axios";
import {
  ALL_BRANDS_FAIL,
  ALL_BRANDS_REQUEST,
  ALL_BRANDS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
} from "../constants/brandConstants";

// Create Order
export const createBrand = (brand) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BRAND_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/brand/create",
      brand,
      config
    );

    dispatch({
      type: CREATE_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All BRANDs (admin)
export const getBrand = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BRANDS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/brand");

    dispatch({ type: ALL_BRANDS_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({
      type: ALL_BRANDS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateBrand = (id, brand) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/brand/${id}`,
      brand,
      config
    );

    dispatch({ type: UPDATE_BRAND_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/brand/${id}`);

    dispatch({ type: DELETE_BRAND_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
