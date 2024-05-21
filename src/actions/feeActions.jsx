import axios from 'axios';
import {
    CREATE_FEE_STRUCTURE_REQUEST,
    CREATE_FEE_STRUCTURE_SUCCESS,
    CREATE_FEE_STRUCTURE_FAIL,
    GET_ALL_FEE_STRUCTURES_REQUEST,
    GET_ALL_FEE_STRUCTURES_SUCCESS,
    GET_ALL_FEE_STRUCTURES_FAIL,
    GET_FEE_STRUCTURE_REQUEST,
    GET_FEE_STRUCTURE_SUCCESS,
    GET_FEE_STRUCTURE_FAIL,
    UPDATE_FEE_STRUCTURE_REQUEST,
    UPDATE_FEE_STRUCTURE_SUCCESS,
    UPDATE_FEE_STRUCTURE_FAIL,
    DELETE_FEE_STRUCTURE_REQUEST,
    DELETE_FEE_STRUCTURE_SUCCESS,
    DELETE_FEE_STRUCTURE_FAIL,
} from '../constants/feeConstants';
const base_url = `http://localhost:5000/api/fees`

// Action to create a new fee structure
export const createFeeStructure = (feeData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_FEE_STRUCTURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${base_url}`, feeData, config);

    dispatch({
      type: CREATE_FEE_STRUCTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FEE_STRUCTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to fetch all fee structures
export const listFeeStructures = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_FEE_STRUCTURES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${base_url}`, config);

    dispatch({
      type: GET_ALL_FEE_STRUCTURES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEE_STRUCTURES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to fetch details of a single fee structure
export const getFeeStructureDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FEE_STRUCTURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/fees/${id}`, config);

    dispatch({
      type: GET_FEE_STRUCTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FEE_STRUCTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to update a fee structure
export const updateFeeStructure = (feeData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_FEE_STRUCTURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/fees/${feeData._id}`, feeData, config);

    dispatch({
      type: UPDATE_FEE_STRUCTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FEE_STRUCTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to delete a fee structure
export const deleteFeeStructure = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FEE_STRUCTURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/fees/${id}`, config);

    dispatch({ type: DELETE_FEE_STRUCTURE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_FEE_STRUCTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
