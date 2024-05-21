import axios from 'axios';
import { ALL_PETTY_CASH_FAIL, ALL_PETTY_CASH_REQUEST, ALL_PETTY_CASH_SUCCESS, CREATE_PETTY_CASH_REQUEST, INDIVIDUAL_PETTY_CASH_FAIL, INDIVIDUAL_PETTY_CASH_REQUEST, INDIVIDUAL_PETTY_CASH_SUCCESS, PETTY_CASH_CREATE_FAIL, PETTY_CASH_CREATE_SUCCESS } from '../constants/pettycashConstants';

const base_url = `http://localhost:5000/api/petty_cash`


// Action creator to create a new requisition
export const createPettyCash = (requestData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PETTY_CASH_REQUEST });

    const { data } = await axios.post(`${base_url}`, requestData);

    dispatch({
      type: PETTY_CASH_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PETTY_CASH_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch all requisitions
export const getAllPettyCash = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PETTY_CASH_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: ALL_PETTY_CASH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PETTY_CASH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creator to fetch an individual requisition
export const getIndividualPettyCash = (requisitionId) => async (dispatch) => {
  try {
    dispatch({ type: INDIVIDUAL_PETTY_CASH_REQUEST });

    const { data } = await axios.get(`${base_url}/${requisitionId}`);

    dispatch({
      type: INDIVIDUAL_PETTY_CASH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_PETTY_CASH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
