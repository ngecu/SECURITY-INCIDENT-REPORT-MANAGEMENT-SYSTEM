// transactionActions.js

import axios from 'axios';
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
  GET_ALL_FEE_PAYMENT_TRANSACTIONS_FAIL,
  GET_ALL_FEE_PAYMENT_TRANSACTIONS_SUCCESS,
  GET_ALL_FEE_PAYMENT_TRANSACTIONS_REQUEST,
  PAY_SCHOOL_FEES_REQUEST,
  PAY_SCHOOL_FEES_SUCCESS,
  PAY_SCHOOL_FEES_FAILURE,
} from '../constants/transactionConstants';

const base_url = `http://localhost:5000/api/transactions`


export const createTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_CREATE_REQUEST });
    const { data } = await axios.post(`${base_url}`, transactionData);
    dispatch({
      type: TRANSACTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });
    const { data } = await axios.get(`${base_url}`);
    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTransactionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });
    const { data } = await axios.get(`${base_url}/${id}`);
    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTransaction = (id, transactionData) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_UPDATE_REQUEST });
    const { data } = await axios.put(`${base_url}/${id}`, transactionData);
    dispatch({
      type: TRANSACTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_DELETE_REQUEST });
    await axios.delete(`${base_url}/${id}`);
    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const creditAllStudentsFees = (body) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_CREDIT_ALL_REQUEST });
    await axios.post(`${base_url}/credit-all`,body);
    dispatch({
      type: TRANSACTION_CREDIT_ALL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_CREDIT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTransactionsByStudent = (studentId) => async (dispatch) => {
    try {
      dispatch({ type: TRANSACTIONS_BY_STUDENT_REQUEST });
      const { data } = await axios.get(`${base_url}/student/${studentId}`);

      dispatch({ type: TRANSACTIONS_BY_STUDENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TRANSACTIONS_BY_STUDENT_FAILURE, payload: 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    }
  };


  export const getAllFeePaymentTransactions = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_FEE_PAYMENT_TRANSACTIONS_REQUEST });
  
      const { data } = await axios.get(`${base_url}/fee-payment-transactions`);
  
      dispatch({
        type: GET_ALL_FEE_PAYMENT_TRANSACTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_FEE_PAYMENT_TRANSACTIONS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const paySchoolFeesAction = (paymentData) => async (dispatch) => {
    try {
      dispatch({ type: PAY_SCHOOL_FEES_REQUEST });
  
      // Make API call to pay school fees
      const { data } = await axios.post(`${base_url}/paySchoolFees`, paymentData);
  
      dispatch({
        type: PAY_SCHOOL_FEES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAY_SCHOOL_FEES_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };