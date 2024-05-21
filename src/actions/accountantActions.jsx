import axios from 'axios';
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
  ACCOUNTANT_DELETE_REQUEST,
  ACCOUNTANT_DELETE_SUCCESS,
  ACCOUNTANT_DELETE_FAIL
} from '../constants/accountantConstants';

const base_url = `http://localhost:5000/api/accountants/`

// Register Accountant
export const registerAccountant = (accountantData) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTANT_REGISTER_REQUEST });
    const { data } = await axios.post(`${base_url}`, accountantData);

    dispatch({
      type: ACCOUNTANT_REGISTER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// List Accountants
export const listAccountants = () => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTANT_LIST_REQUEST });
    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: ACCOUNTANT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Get Accountant Details
export const getAccountantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTANT_DETAILS_REQUEST });
    const { data } = await axios.get(`${base_url}/${id}`);

    dispatch({
      type: ACCOUNTANT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Update Accountant
export const updateAccountant = (accountant) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNTANT_UPDATE_REQUEST });

    const { data } = await axios.put(`${base_url}/${accountant._id}`, accountant);

    dispatch({
      type: ACCOUNTANT_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Delete Accountant
export const deleteAccountant = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTANT_DELETE_REQUEST });
    await axios.delete(`${base_url}/${id}`);

    dispatch({
      type: ACCOUNTANT_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
