import axios from 'axios';
import {
  STK_PUSH_REQUEST,
  STK_PUSH_SUCCESS,
  STK_PUSH_FAIL,
} from '../constants/mpesaConstants';

const base_url = `http://localhost:5000/api/mpesa`

export const initiateSTKPush = (amount, phoneNumber) => async (dispatch, getState) => {
  try {
    dispatch({ type: STK_PUSH_REQUEST });

    const { data } = await axios.post(`${base_url}/stkPush`, { amount, phoneNumber });

    dispatch({
      type: STK_PUSH_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: STK_PUSH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
