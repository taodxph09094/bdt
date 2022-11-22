import {
  ALL_FEEDBACKS_FAIL,
  ALL_FEEDBACKS_REQUEST,
  ALL_FEEDBACKS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_FEEDBACK_FAIL,
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_RESET,
  CREATE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_RESET,
  DELETE_FEEDBACK_SUCCESS,
  FEEDBACK_DETAILS_FAIL,
  FEEDBACK_DETAILS_REQUEST,
  FEEDBACK_DETAILS_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_RESET,
  UPDATE_FEEDBACK_SUCCESS,
} from "../constants/feedbackConstants";

export const newFeedbackReducer = (state = { feedback: {} }, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_FEEDBACK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        feedback: action.feedback,
      };

    case CREATE_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_FEEDBACK_RESET:
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

export const allFeedbackReducer = (state = { feedback: [] }, action) => {
  switch (action.type) {
    case ALL_FEEDBACKS_REQUEST:
      return {
        loading: true,
      };

    case ALL_FEEDBACKS_SUCCESS:
      return {
        loading: false,
        feedback: action.payload,
      };

    case ALL_FEEDBACKS_FAIL:
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

export const feedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FEEDBACK_REQUEST:
    case DELETE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_FEEDBACK_FAIL:
    case DELETE_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_FEEDBACK_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_FEEDBACK_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const feedbackDetailsReducer = (state = { feedback: {} }, action) => {
  switch (action.type) {
    case FEEDBACK_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case FEEDBACK_DETAILS_SUCCESS:
      return {
        loading: false,
        feedback: action.payload,
      };
    case FEEDBACK_DETAILS_FAIL:
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
