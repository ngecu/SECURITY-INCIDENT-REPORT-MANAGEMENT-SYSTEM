import axios from 'axios';
import {
    LEAVE_REQUEST,
    LEAVE_SUCCESS,
    LEAVE_FAIL,
    LEAVE_LIST_REQUEST,
    LEAVE_LIST_SUCCESS,
    LEAVE_LIST_FAIL,
    LEAVE_UPDATE_REQUEST,
    LEAVE_UPDATE_SUCCESS,
    LEAVE_UPDATE_FAIL,
    LEAVE_DELETE_REQUEST,
    LEAVE_DELETE_SUCCESS,
    LEAVE_DELETE_FAIL,
    LEAVE_DETAILS_REQUEST,
    LEAVE_DETAILS_SUCCESS,
    LEAVE_DETAILS_FAIL,
    LEAVE_CREATE_REQUEST,
    LEAVE_CREATE_SUCCESS,
    LEAVE_CREATE_FAIL,
    USER_LEAVE_DETAILS_REQUEST,
    USER_LEAVE_DETAILS_SUCCESS,
    USER_LEAVE_DETAILS_FAIL
} from '../constants/leaveConstants';
const base_url = `http://localhost:5000/api/leave`


export const listLeaves = () => async (dispatch,getState) => {
    try {
        dispatch({ type: LEAVE_LIST_REQUEST });
        
        const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          
        const { data } = await axios.get(`${base_url}`)
        dispatch({ type: LEAVE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LEAVE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getLeaveDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({ type: LEAVE_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          const { data } = await axios.get(`${base_url}/${id}`, config);

        dispatch({ type: LEAVE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LEAVE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getUserLeaveDetails = (id) => async (dispatch,getState) => {
  try {
      dispatch({ type: USER_LEAVE_DETAILS_REQUEST });

      const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`${base_url}/user/${id}`, config);

      dispatch({ type: USER_LEAVE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: USER_LEAVE_DETAILS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
  }
};

export const createLeave = (leaveData) => async (dispatch,getState) => {
    try {
        dispatch({ type: LEAVE_CREATE_REQUEST });
        
        const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        const { data } = await axios.post(`${base_url}`, leaveData, config);
        console.log(data);

        dispatch({ type: LEAVE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LEAVE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateLeave = (id, leaveData) => async (dispatch) => {
    try {
        dispatch({ type: LEAVE_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

    const { data } = await axios.put(`${base_url}/${id}`, leaveData, config);

    dispatch({ type: LEAVE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LEAVE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};