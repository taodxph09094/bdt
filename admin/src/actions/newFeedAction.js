import axios from "axios";
import {
  ADMIN_NEWFEED_FAIL,
  ADMIN_NEWFEED_REQUEST,
  ADMIN_NEWFEED_SUCCESS,
  ALL_NEWFEED_FAIL,
  ALL_NEWFEED_REQUEST,
  ALL_NEWFEED_SUCCESS,
  CLEAR_ERRORS,
  DELETE_NEWFEED_FAIL,
  DELETE_NEWFEED_REQUEST,
  DELETE_NEWFEED_SUCCESS,
  NEWFEED_DETAILS_FAIL,
  NEWFEED_DETAILS_REQUEST,
  NEWFEED_DETAILS_SUCCESS,
  NEW_NEWFEED_FAIL,
  NEW_NEWFEED_REQUEST,
  NEW_NEWFEED_SUCCESS,
  UPDATE_NEWFEED_FAIL,
  UPDATE_NEWFEED_REQUEST,
  UPDATE_NEWFEED_SUCCESS,
} from "../constants/newFeedConstants";
// Get All NEWFEEDs
export const getNewFeed =
  (keyword = "", currentPage = 1, category, tag) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_NEWFEED_REQUEST });

      let link = `/api/v1/newFeeds?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/newFeeds?keyword=${keyword}&page=${currentPage}&category=${category}&tag=${tag}`;
      }
      if (tag) {
        link = `/api/v1/newFeeds?keyword=${keyword}&page=${currentPage}&category=${category}&tag=${tag}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_NEWFEED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_NEWFEED_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All NEWFEEDs For Admin
export const getAdminNewFeed = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_NEWFEED_REQUEST });

    const { data } = await axios.get("/api/v1/admin/newFeeds");
    console.log(data);
    dispatch({
      type: ADMIN_NEWFEED_SUCCESS,
      payload: data.newFeeds,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_NEWFEED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create NEWFEED
export const createNewFeed = (newFeedData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_NEWFEED_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/newFeed/new`,
      newFeedData,
      config
    );

    dispatch({
      type: NEW_NEWFEED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_NEWFEED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update NEWFEED
export const updateNewFeed = (id, newFeedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NEWFEED_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/newFeed/${id}`,
      newFeedData,
      config
    );

    dispatch({
      type: UPDATE_NEWFEED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NEWFEED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete newFeed
export const deleteNewFeed = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NEWFEED_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/newFeed/${id}`);

    dispatch({
      type: DELETE_NEWFEED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NEWFEED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get NEWFEEDs Details
export const getNewFeedDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWFEED_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/newFeed/${id}`);

    dispatch({
      type: NEWFEED_DETAILS_SUCCESS,
      payload: data.newFeed,
    });
  } catch (error) {
    dispatch({
      type: NEWFEED_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
