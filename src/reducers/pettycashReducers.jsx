import {
    CREATE_PETTY_CASH_REQUEST,
    PETTY_CASH_CREATE_SUCCESS,
    PETTY_CASH_CREATE_FAIL,
    ALL_PETTY_CASH_REQUEST,
    ALL_PETTY_CASH_SUCCESS,
    ALL_PETTY_CASH_FAIL,
    INDIVIDUAL_PETTY_CASH_REQUEST,
    INDIVIDUAL_PETTY_CASH_SUCCESS,
    INDIVIDUAL_PETTY_CASH_FAIL,
  } from "../constants/pettycashConstants";
  
  export const pettycashCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_PETTY_CASH_REQUEST:
        return { loading: true };
      case PETTY_CASH_CREATE_SUCCESS:
        return { loading: false, success: true, petty_cash: action.payload };
      case PETTY_CASH_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const allPettycashReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_PETTY_CASH_REQUEST:
        return { loading: true };
      case ALL_PETTY_CASH_SUCCESS:
        return { loading: false, pettycash: action.payload };
      case ALL_PETTY_CASH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const individualPettycashReducer = (state = {}, action) => {
    switch (action.type) {
      case INDIVIDUAL_PETTY_CASH_REQUEST:
        return { loading: true };
      case INDIVIDUAL_PETTY_CASH_SUCCESS:
        return { loading: false, reimbursment: action.payload };
      case INDIVIDUAL_PETTY_CASH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };