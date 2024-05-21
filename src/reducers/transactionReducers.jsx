import {
    TRANSACTION_CREATE_REQUEST,
    TRANSACTION_CREATE_SUCCESS,
    TRANSACTION_CREATE_FAIL,
    TRANSACTION_LIST_REQUEST,
    TRANSACTION_LIST_SUCCESS,
    TRANSACTION_LIST_FAIL,
    TRANSACTION_DETAILS_REQUEST,
    TRANSACTION_DETAILS_SUCCESS,
    TRANSACTION_DETAILS_FAIL,
    TRANSACTION_UPDATE_REQUEST,
    TRANSACTION_UPDATE_SUCCESS,
    TRANSACTION_UPDATE_FAIL,
    TRANSACTION_DELETE_REQUEST,
    TRANSACTION_DELETE_SUCCESS,
    TRANSACTION_DELETE_FAIL,
    TRANSACTION_CREDIT_ALL_REQUEST,
    TRANSACTION_CREDIT_ALL_SUCCESS,
    TRANSACTION_CREDIT_ALL_FAIL,
    TRANSACTIONS_BY_STUDENT_REQUEST,
    TRANSACTIONS_BY_STUDENT_SUCCESS,
    TRANSACTIONS_BY_STUDENT_FAILURE,
    GET_ALL_FEE_PAYMENT_TRANSACTIONS_REQUEST,
    GET_ALL_FEE_PAYMENT_TRANSACTIONS_SUCCESS,
    GET_ALL_FEE_PAYMENT_TRANSACTIONS_FAIL,
    PAY_SCHOOL_FEES_REQUEST,
    PAY_SCHOOL_FEES_SUCCESS,
    PAY_SCHOOL_FEES_FAILURE,
  } from '../constants/transactionConstants';
  
  // Transaction Create Reducer
  export const transactionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TRANSACTION_CREATE_REQUEST:
        return { loading: true };
      case TRANSACTION_CREATE_SUCCESS:
        return { loading: false, success: true, transaction: action.payload };
      case TRANSACTION_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Transaction List Reducer
  export const transactionListReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {
      case TRANSACTION_LIST_REQUEST:
        return { loading: true,  };
      case TRANSACTION_LIST_SUCCESS:
        return { loading: false, transactions: action.payload };
      case TRANSACTION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Transaction Details Reducer
  export const transactionDetailsReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {
      case TRANSACTION_DETAILS_REQUEST:
        return { loading: true, ...state };
      case TRANSACTION_DETAILS_SUCCESS:
        return { loading: false, transaction: action.payload };
      case TRANSACTION_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Transaction Update Reducer
  export const transactionUpdateReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {
      case TRANSACTION_UPDATE_REQUEST:
        return { loading: true };
      case TRANSACTION_UPDATE_SUCCESS:
        return { loading: false, success: true, transaction: action.payload };
      case TRANSACTION_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Transaction Delete Reducer
  export const transactionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TRANSACTION_DELETE_REQUEST:
        return { loading: true };
      case TRANSACTION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TRANSACTION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Transaction Credit All Reducer
  export const transactionCreditAllReducer = (state = {}, action) => {
    switch (action.type) {
      case TRANSACTION_CREDIT_ALL_REQUEST:
        return { loading: true };
      case TRANSACTION_CREDIT_ALL_SUCCESS:
        return { loading: false, success: true };
      case TRANSACTION_CREDIT_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const transactionsByStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case TRANSACTIONS_BY_STUDENT_REQUEST:
        return {loading: true};
      case TRANSACTIONS_BY_STUDENT_SUCCESS:
        return {loading: false,error: null,transactions: action.payload,
        };
      case TRANSACTIONS_BY_STUDENT_FAILURE:
        return {loading: false,error: action.payload };
      default:
        return state;
    }
  };
  

  export const allFeePaymentTransactionsReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {
      case GET_ALL_FEE_PAYMENT_TRANSACTIONS_REQUEST:
        return { loading: true };
      case GET_ALL_FEE_PAYMENT_TRANSACTIONS_SUCCESS:
        return { loading: false, all_fee_transactions: action.payload };
      case GET_ALL_FEE_PAYMENT_TRANSACTIONS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  // Reducer for handling the payment of school fees
export const paySchoolFeesReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_SCHOOL_FEES_REQUEST:
      return { loading: true };
    case PAY_SCHOOL_FEES_SUCCESS:
      return { loading: false, success: true, payment: action.payload };
    case PAY_SCHOOL_FEES_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};