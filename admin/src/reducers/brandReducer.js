import {
  ALL_BRANDS_FAIL,
  ALL_BRANDS_REQUEST,
  ALL_BRANDS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_RESET,
  CREATE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_RESET,
  DELETE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_RESET,
  UPDATE_BRAND_SUCCESS,
} from "../constants/brandConstants";

export const newBrandReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BRAND_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        brand: action.brand,
      };

    case CREATE_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BRAND_RESET:
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

export const allBrandReducer = (state = { brand: [] }, action) => {
  switch (action.type) {
    case ALL_BRANDS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BRANDS_SUCCESS:
      return {
        loading: false,
        brand: action.payload,
      };

    case ALL_BRANDS_FAIL:
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

export const brandReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BRAND_REQUEST:
    case DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BRAND_FAIL:
    case DELETE_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BRAND_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_BRAND_RESET:
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
