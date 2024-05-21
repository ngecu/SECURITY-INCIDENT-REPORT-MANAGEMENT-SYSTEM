import {
  ACCOUNTANT_REGISTER_REQUEST,
  ACCOUNTANT_REGISTER_SUCCESS,
  ACCOUNTANT_REGISTER_FAIL,
  ACCOUNTANT_LIST_REQUEST,
  ACCOUNTANT_LIST_SUCCESS,
  ACCOUNTANT_LIST_FAIL,
  ACCOUNTANT_DETAILS_REQUEST,
  ACCOUNTANT_DETAILS_SUCCESS,
  ACCOUNTANT_DETAILS_FAIL,
  ACCOUNTANT_UPDATE_REQUEST,
  ACCOUNTANT_UPDATE_SUCCESS,
  ACCOUNTANT_UPDATE_FAIL,
  ACCOUNTANT_UPDATE_RESET,
  ACCOUNTANT_DELETE_REQUEST,
  ACCOUNTANT_DELETE_SUCCESS,
  ACCOUNTANT_DELETE_FAIL,
  ACCOUNTANT_RESET
} from '../constants/accountantConstants';

// Accountant registration reducer
export const accountantRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTANT_REGISTER_REQUEST:
      return { loading: true };
    case ACCOUNTANT_REGISTER_SUCCESS:
      return { loading: false, success: true, accountantInfo: action.payload };
    case ACCOUNTANT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Accountants listing reducer
export const accountantListReducer = (state = { accountants: [] }, action) => {
  switch (action.type) {
    case ACCOUNTANT_LIST_REQUEST:
      return { loading: true };
    case ACCOUNTANT_LIST_SUCCESS:
      return { loading: false, accountants: action.payload };
    case ACCOUNTANT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Accountant details reducer
export const accountantDetailsReducer = (state = { accountant: {} }, action) => {
  switch (action.type) {
    case ACCOUNTANT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ACCOUNTANT_DETAILS_SUCCESS:
      return { loading: false, accountant: action.payload };
    case ACCOUNTANT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Accountant update reducer
export const accountantUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTANT_UPDATE_REQUEST:
      return { loading: true };
    case ACCOUNTANT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ACCOUNTANT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNTANT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// Accountant delete reducer
export const accountantDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTANT_DELETE_REQUEST:
      return { loading: true };
    case ACCOUNTANT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ACCOUNTANT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Resetting accountant reducer state
export const accountantResetReducer = (state = {}, action) => {
  if (action.type === ACCOUNTANT_RESET) {
    return {}; // Completely reset the state
  }
  return state; // Return the existing state if not resetting
};
