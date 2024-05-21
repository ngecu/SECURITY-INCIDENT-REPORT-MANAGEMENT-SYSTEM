// Filename: actions/voteheadActions.js
import axios from 'axios';
import {
  VOTEHEAD_LIST_REQUEST,
  VOTEHEAD_LIST_SUCCESS,
  VOTEHEAD_LIST_FAIL,
  VOTEHEAD_DETAILS_REQUEST,
  VOTEHEAD_DETAILS_SUCCESS,
  VOTEHEAD_DETAILS_FAIL,
  VOTEHEAD_CREATE_REQUEST,
  VOTEHEAD_CREATE_SUCCESS,
  VOTEHEAD_CREATE_FAIL,
  VOTEHEAD_UPDATE_REQUEST,
  VOTEHEAD_UPDATE_SUCCESS,
  VOTEHEAD_UPDATE_FAIL,
  VOTEHEAD_DELETE_REQUEST,
  VOTEHEAD_DELETE_SUCCESS,
  VOTEHEAD_DELETE_FAIL,
} from '../constants/voteheadConstants';

const base_url = `http://localhost:5000/api/voteheads`


// List Voteheads
export const listVoteheads = () => async (dispatch) => {
  try {
    dispatch({ type: VOTEHEAD_LIST_REQUEST });
    const { data } = await axios.get(`${base_url}`);
    dispatch({
      type: VOTEHEAD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOTEHEAD_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Fetch Votehead Details
export const getVoteheadDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VOTEHEAD_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/voteheads/${id}`);
    dispatch({
      type: VOTEHEAD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOTEHEAD_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Create Votehead
export const createVotehead = (votehead) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOTEHEAD_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${base_url}`, votehead, config);
    dispatch({
      type: VOTEHEAD_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOTEHEAD_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update Votehead
export const updateVotehead = (votehead) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOTEHEAD_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/voteheads/${votehead._id}`, votehead, config);
    dispatch({
      type: VOTEHEAD_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOTEHEAD_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete Votehead
export const deleteVotehead = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOTEHEAD_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/voteheads/${id}`, config);
    dispatch({
      type: VOTEHEAD_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VOTEHEAD_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
