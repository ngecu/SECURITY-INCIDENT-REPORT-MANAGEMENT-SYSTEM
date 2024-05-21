import axios from 'axios';
import {
  REQUISITION_CREATE_FAIL,
  REQUISITION_CREATE_SUCCESS,
  ALL_REQUISITIONS_FAIL,
  ALL_REQUISITIONS_REQUEST,
  ALL_REQUISITIONS_SUCCESS,
  INDIVIDUAL_REQUISITION_FAIL,
  INDIVIDUAL_REQUISITION_REQUEST,
  INDIVIDUAL_REQUISITION_SUCCESS,
  CREATE_REQUISITION_REQUEST,
  DEPARTMENT_REQUISITION_LIST_REQUEST,
  DEPARTMENT_REQUISITION_LIST_SUCCESS,
  DEPARTMENT_REQUISITION_LIST_FAIL,
  REQUISITION_APPROVE_REQUEST,
  REQUISITION_APPROVE_SUCCESS,
  REQUISITION_APPROVE_FAIL,
} from '../constants/requisitionConstants';

const base_url = `http://localhost:5000/api/requisitions`


// Action creator to create a new requisition
export const createRequisition = (requestData) => async (dispatch) => {
  try {

    dispatch({ type: CREATE_REQUISITION_REQUEST });
    const { data } = await axios.post(`${base_url}`, requestData);
    console.log("resds ",data);

    dispatch({
      type: REQUISITION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUISITION_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch all requisitions
export const getAllRequisitions = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REQUISITIONS_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: ALL_REQUISITIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_REQUISITIONS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch an individual requisition
export const getIndividualRequisition = (requisitionId) => async (dispatch) => {
  try {
    dispatch({ type: INDIVIDUAL_REQUISITION_REQUEST });

    const { data } = await axios.get(`${base_url}/${requisitionId}`);

    dispatch({
      type: INDIVIDUAL_REQUISITION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_REQUISITION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const fetchDepartmentRequisitions = (department) => async (dispatch) => {
  try {
      dispatch({ type: DEPARTMENT_REQUISITION_LIST_REQUEST });
      const { data } = await axios.get(`${base_url}/department/${department}`);
      dispatch({
          type: DEPARTMENT_REQUISITION_LIST_SUCCESS,
          payload: data
      });
  } catch (error) {
      dispatch({
          type: DEPARTMENT_REQUISITION_LIST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
  }
};

export const approveRequisition = (requisitionId, userId, decision, stage) => async (dispatch) => {
  try {
    dispatch({ type: REQUISITION_APPROVE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Replace 'http://localhost:5000' with your API base URL as needed
    const { data } = await axios.post(
      `${base_url}/${requisitionId}/approve`, 
      { userId, decision, stage },
      config
    );

    dispatch({
      type: REQUISITION_APPROVE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REQUISITION_APPROVE_FAIL,
      payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message
    });
  }
};