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
  DELETE_NEWFEED_RESET,
  DELETE_NEWFEED_SUCCESS,
  NEWFEED_DETAILS_FAIL,
  NEWFEED_DETAILS_REQUEST,
  NEWFEED_DETAILS_SUCCESS,
  NEW_NEWFEED_FAIL,
  NEW_NEWFEED_REQUEST,
  NEW_NEWFEED_RESET,
  NEW_NEWFEED_SUCCESS,
  UPDATE_NEWFEED_FAIL,
  UPDATE_NEWFEED_REQUEST,
  UPDATE_NEWFEED_RESET,
  UPDATE_NEWFEED_SUCCESS,
} from "../constants/newFeedConstants";

export const newFeedsReducer = (state = { newFeeds: [] }, action) => {
  switch (action.type) {
    case ALL_NEWFEED_REQUEST:
    case ADMIN_NEWFEED_REQUEST:
      return {
        loading: true,
        newFeeds: [],
      };
    case ALL_NEWFEED_SUCCESS:
      return {
        loading: false,
        newFeeds: action.payload.newFeeds,
        newFeedsCount: action.payload.newFeedsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredNewFeedsCount: action.payload.filteredNewFeedsCount,
      };

    case ADMIN_NEWFEED_SUCCESS:
      return {
        loading: false,
        newFeeds: action.payload,
      };
    case ALL_NEWFEED_FAIL:
    case ADMIN_NEWFEED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newNewFeedReducer = (state = { newFeed: {} }, action) => {
  switch (action.type) {
    case NEW_NEWFEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_NEWFEED_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newFeed: action.payload.newFeed,
      };
    case NEW_NEWFEED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_NEWFEED_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newFeedReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NEWFEED_REQUEST:
    case UPDATE_NEWFEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWFEED_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_NEWFEED_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_NEWFEED_FAIL:
    case UPDATE_NEWFEED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NEWFEED_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_NEWFEED_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newFeedDetailsReducer = (state = { newFeed: {} }, action) => {
  switch (action.type) {
    case NEWFEED_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEWFEED_DETAILS_SUCCESS:
      return {
        loading: false,
        newFeed: action.payload,
      };
    case NEWFEED_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
