import {
    STK_PUSH_REQUEST,
    STK_PUSH_SUCCESS,
    STK_PUSH_FAIL,
  } from '../constants/mpesaConstants';
  
  export const mpesaReducer = (state = {}, action) => {
    switch (action.type) {
      case STK_PUSH_REQUEST:
        return { loading: true };
      case STK_PUSH_SUCCESS:
        return { loading: false, success: true, message: action.payload };
      case STK_PUSH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  