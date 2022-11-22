import {
  ADMIN_STATISTICAL_REQUEST,
  ADMIN_STATISTICAL_SUCCESS,
  ADMIN_STATISTICAL_FAIL,
  NEW_STATISTICAL_REQUEST,
  NEW_STATISTICAL_SUCCESS,
  NEW_STATISTICAL_FAIL,
  NEW_STATISTICAL_RESET,
  DELETE_STATISTICAL_REQUEST,
  DELETE_STATISTICAL_SUCCESS,
  DELETE_STATISTICAL_FAIL,
  DELETE_STATISTICAL_RESET,
  STATISTICAL_DETAILS_REQUEST,
  STATISTICAL_DETAILS_FAIL,
  STATISTICAL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/statisticalConstants";

export const statisticalsReducer = (state = { statisticals: [] }, action) => {
  switch (action.type) {
    case ADMIN_STATISTICAL_REQUEST:
      return {
        loading: true,
        statisticals: [],
      };

    case ADMIN_STATISTICAL_SUCCESS:
      return {
        loading: false,
        statisticals: action.payload,
      };
    case ADMIN_STATISTICAL_FAIL:
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

export const newStatisticalReducer = (state = { statistical: {} }, action) => {
  switch (action.type) {
    case NEW_STATISTICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_STATISTICAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        statistical: action.payload.statistical,
      };
    case NEW_STATISTICAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_STATISTICAL_RESET:
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

export const statisticalReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STATISTICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_STATISTICAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_STATISTICAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STATISTICAL_RESET:
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

export const statisticalDetailsReducer = (
  state = { statistical: {} },
  action
) => {
  switch (action.type) {
    case STATISTICAL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case STATISTICAL_DETAILS_SUCCESS:
      return {
        loading: false,
        statistical: action.payload,
      };
    case STATISTICAL_DETAILS_FAIL:
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
