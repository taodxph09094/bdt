import axios from "axios";

import {
  ADMIN_STATISTICAL_REQUEST,
  ADMIN_STATISTICAL_SUCCESS,
  ADMIN_STATISTICAL_FAIL,
  NEW_STATISTICAL_REQUEST,
  NEW_STATISTICAL_SUCCESS,
  NEW_STATISTICAL_FAIL,
  DELETE_STATISTICAL_REQUEST,
  DELETE_STATISTICAL_SUCCESS,
  DELETE_STATISTICAL_FAIL,
  STATISTICAL_DETAILS_REQUEST,
  STATISTICAL_DETAILS_FAIL,
  STATISTICAL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/statisticalConstants";
// Get All STATISTICALs For Admin
export const getAdminStatistical = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_STATISTICAL_REQUEST });

    const { data } = await axios.get("/api/v1/admin/statistical");

    dispatch({
      type: ADMIN_STATISTICAL_SUCCESS,
      payload: data.statisticals,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATISTICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create STATISTICAL
export const createStatistical = (statisticalData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_STATISTICAL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/statistical/create`,
      statisticalData,
      config
    );

    dispatch({
      type: NEW_STATISTICAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_STATISTICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete statistical
export const deleteStatistical = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STATISTICAL_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/statistical/${id}`);

    dispatch({
      type: DELETE_STATISTICAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STATISTICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get statisticals Details
export const getStatisticalDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STATISTICAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/statistical/${id}`);

    dispatch({
      type: STATISTICAL_DETAILS_SUCCESS,
      payload: data.statistical,
    });
  } catch (error) {
    dispatch({
      type: STATISTICAL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
