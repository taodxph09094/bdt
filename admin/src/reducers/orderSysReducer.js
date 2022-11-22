import {
  CREATE_ORDEROFF_REQUEST,
  CREATE_ORDEROFF_SUCCESS,
  CREATE_ORDEROFF_FAIL,
  MY_ORDEROFFS_REQUEST,
  MY_ORDEROFFS_SUCCESS,
  MY_ORDEROFFS_FAIL,
  ALL_ORDEROFFS_REQUEST,
  ALL_ORDEROFFS_SUCCESS,
  ALL_ORDEROFFS_FAIL,
  UPDATE_ORDEROFF_REQUEST,
  UPDATE_ORDEROFF_SUCCESS,
  UPDATE_ORDEROFF_FAIL,
  UPDATE_ORDEROFF_RESET,
  DELETE_ORDEROFF_REQUEST,
  DELETE_ORDEROFF_SUCCESS,
  DELETE_ORDEROFF_FAIL,
  DELETE_ORDEROFF_RESET,
  ORDEROFF_DETAILS_REQUEST,
  ORDEROFF_DETAILS_SUCCESS,
  ORDEROFF_DETAILS_FAIL,
  CLEAR_ERRORS,
  CREATE_ORDEROFF_RESET,
} from "../constants/orderSysConstants";

export const newOrderSysReducer = (state = { orderSystem: {} }, action) => {
  switch (action.type) {
    case CREATE_ORDEROFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDEROFF_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        orderSystem: action.orderSystem,
      };

    case CREATE_ORDEROFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ORDEROFF_RESET:
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
export const myOrdersSysReducer = (state = { ordersSystem: [] }, action) => {
  switch (action.type) {
    case MY_ORDEROFFS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDEROFFS_SUCCESS:
      return {
        loading: false,
        ordersSystem: action.payload,
      };

    case MY_ORDEROFFS_FAIL:
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
export const allOrdersSysReducer = (state = { ordersSystem: [] }, action) => {
  switch (action.type) {
    case ALL_ORDEROFFS_REQUEST:
      return {
        loading: true,
        ordersSystem: [],
      };

    case ALL_ORDEROFFS_SUCCESS:
      return {
        loading: false,
        ordersSystem: action.payload.ordersSystem,
        totalAmountCash: action.payload.totalAmountCash,
        ordersSystemCount: action.payload.ordersSystemCount,
      };

    case ALL_ORDEROFFS_FAIL:
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

export const orderSysReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDEROFF_REQUEST:
    case DELETE_ORDEROFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDEROFF_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDEROFF_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDEROFF_FAIL:
    case DELETE_ORDEROFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDEROFF_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDEROFF_RESET:
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

export const orderSysDetailsReducer = (state = { orderSystem: {} }, action) => {
  switch (action.type) {
    case ORDEROFF_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDEROFF_DETAILS_SUCCESS:
      return {
        loading: false,
        orderSystem: action.payload,
      };

    case ORDEROFF_DETAILS_FAIL:
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
