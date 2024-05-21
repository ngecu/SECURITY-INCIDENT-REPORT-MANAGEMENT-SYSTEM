import axios from 'axios'
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, FETCH_ALL_COMMENTS_FAIL, FETCH_ALL_COMMENTS_REQUEST, FETCH_ALL_COMMENTS_SUCCESS, FETCH_COMMENTS_BY_AGENT_FAIL, FETCH_COMMENTS_BY_AGENT_REQUEST, FETCH_COMMENTS_BY_AGENT_SUCCESS, FETCH_COMMENTS_BY_LEAD_FAIL, FETCH_COMMENTS_BY_LEAD_REQUEST, FETCH_COMMENTS_BY_LEAD_SUCCESS, FETCH_MY_TODAYS_COMMENTS_FAIL, FETCH_MY_TODAYS_COMMENTS_REQUEST, FETCH_MY_TODAYS_COMMENTS_SUCCESS } from '../constants/commentConstants'


const base_url = `http://localhost:5000/api/comments`

export const addCommentActions = (values) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_COMMENT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${base_url}`,values,config
    )

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data,
    })

} catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fetchCommentsByLeadId = (leadId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COMMENTS_BY_LEAD_REQUEST });

    const { data } = await axios.get(`${base_url}/by-lead/${leadId}`);

    dispatch({
      type: FETCH_COMMENTS_BY_LEAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_BY_LEAD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchCommentsByAgentId = (agentId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COMMENTS_BY_AGENT_REQUEST });

    const { data } = await axios.get(`${base_url}/agent/${agentId}`);

    dispatch({
      type: FETCH_COMMENTS_BY_AGENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_BY_AGENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchAllComments = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_COMMENTS_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: FETCH_ALL_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_COMMENTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchMyTodaysComments = (agentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_MY_TODAYS_COMMENTS_REQUEST });

    const { userLogin: { userInfo } } = getState(); // Get user info if needed for token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` // Assuming token-based authentication
      }
    };

    const response = await axios.get(`${base_url}/my-today/${agentId}`, config);

    dispatch({
      type: FETCH_MY_TODAYS_COMMENTS_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: FETCH_MY_TODAYS_COMMENTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};