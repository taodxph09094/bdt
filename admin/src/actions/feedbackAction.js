import axios from "axios";
import {
  ALL_FEEDBACKS_FAIL,
  ALL_FEEDBACKS_REQUEST,
  ALL_FEEDBACKS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_FEEDBACK_FAIL,
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
  FEEDBACK_DETAILS_FAIL,
  FEEDBACK_DETAILS_REQUEST,
  FEEDBACK_DETAILS_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
} from "../constants/feedbackConstants";

// Create
export const createFeedback = (feedback) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FEEDBACK_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/feedback/create",
      feedback,
      config
    );

    dispatch({
      type: CREATE_FEEDBACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All FEEDBACKs (admin)
export const getFeedback = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FEEDBACKS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/feedback");

    dispatch({ type: ALL_FEEDBACKS_SUCCESS, payload: data.feedback });
  } catch (error) {
    dispatch({
      type: ALL_FEEDBACKS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getFeedbackDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FEEDBACK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/feedback/${id}`);

    dispatch({
      type: FEEDBACK_DETAILS_SUCCESS,
      payload: data.feedback,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update FEEDBACK
export const updateFeedback = (id, feedback) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEEDBACK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/feedback/${id}`,
      feedback,
      config
    );

    dispatch({ type: UPDATE_FEEDBACK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete FEEDBACK
export const deleteFeedback = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEEDBACK_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/feedback/${id}`);

    dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
