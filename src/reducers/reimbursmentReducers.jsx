import {
    CREATE_REIMBURSMENT_REQUEST,
    REIMBURSMENT_CREATE_SUCCESS,
    REIMBURSMENT_CREATE_FAIL,
    ALL_REIMBURSMENTS_REQUEST,
    ALL_REIMBURSMENTS_SUCCESS,
    ALL_REIMBURSMENTS_FAIL,
    INDIVIDUAL_REIMBURSMENT_REQUEST,
    INDIVIDUAL_REIMBURSMENT_SUCCESS,
    INDIVIDUAL_REIMBURSMENT_FAIL,
  } from "../constants/reimbursementConstants";
  
  export const reimbursementCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_REIMBURSMENT_REQUEST:
        return { loading: true };
      case REIMBURSMENT_CREATE_SUCCESS:
        return { loading: false, success: true, reimbursment: action.payload };
      case REIMBURSMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const allReimbursementsReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_REIMBURSMENTS_REQUEST:
        return { loading: true };
      case ALL_REIMBURSMENTS_SUCCESS:
        return { loading: false, reimbursments: action.payload };
      case ALL_REIMBURSMENTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const individualReimbursementReducer = (state = {}, action) => {
    switch (action.type) {
      case INDIVIDUAL_REIMBURSMENT_REQUEST:
        return { loading: true };
      case INDIVIDUAL_REIMBURSMENT_SUCCESS:
        return { loading: false, reimbursment: action.payload };
      case INDIVIDUAL_REIMBURSMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  