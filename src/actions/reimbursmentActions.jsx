import axios from 'axios';
import { ALL_REIMBURSMENTS_FAIL, ALL_REIMBURSMENTS_REQUEST, ALL_REIMBURSMENTS_SUCCESS, CREATE_REIMBURSMENT_REQUEST, INDIVIDUAL_REIMBURSMENT_FAIL, INDIVIDUAL_REIMBURSMENT_REQUEST, INDIVIDUAL_REIMBURSMENT_SUCCESS, REIMBURSMENT_CREATE_FAIL, REIMBURSMENT_CREATE_SUCCESS } from '../constants/reimbursementConstants';

const base_url = `http://localhost:5000/api/reimbursement`


// Action creator to create a new requisition
export const createReimbursement = (requestData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REIMBURSMENT_REQUEST });

    const { data } = await axios.post(`${base_url}`, requestData);

    dispatch({
      type: REIMBURSMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REIMBURSMENT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch all requisitions
export const getAllReimbursements = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REIMBURSMENTS_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: ALL_REIMBURSMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_REIMBURSMENTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch an individual requisition
export const getIndividualReimbursement = (requisitionId) => async (dispatch) => {
  try {
    dispatch({ type: INDIVIDUAL_REIMBURSMENT_REQUEST });

    const { data } = await axios.get(`${base_url}/${requisitionId}`);

    dispatch({
      type: INDIVIDUAL_REIMBURSMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_REIMBURSMENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
