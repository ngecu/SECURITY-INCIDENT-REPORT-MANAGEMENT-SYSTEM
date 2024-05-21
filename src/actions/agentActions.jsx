import axios from 'axios';
import {
  AGENT_LIST_REQUEST,
  AGENT_LIST_SUCCESS,
  AGENT_LIST_FAIL,
  AGENT_DETAILS_REQUEST,
  AGENT_DETAILS_SUCCESS,
  AGENT_DETAILS_FAIL,
  AGENT_CREATE_REQUEST,
  AGENT_CREATE_SUCCESS,
  AGENT_CREATE_FAIL,
  AGENT_UPDATE_REQUEST,
  AGENT_UPDATE_SUCCESS,
  AGENT_UPDATE_FAIL,
  AGENT_DELETE_REQUEST,
  AGENT_DELETE_SUCCESS,
  AGENT_DELETE_FAIL
} from '../constants/agentConstants';

const base_url = `http://localhost:5000/api/agents/`

export const listAgents = () => async (dispatch) => {
    try {
      dispatch({ type: AGENT_LIST_REQUEST });
  
      const { data } = await axios.get(`${base_url}/`);
  
      dispatch({
        type: AGENT_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: AGENT_LIST_FAIL,
        payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
    }
  };

export  const getAgentDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: AGENT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${base_url}/${id}`);
  
      dispatch({
        type: AGENT_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: AGENT_DETAILS_FAIL,
        payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
    }
  };

export const createAgent = (agent) => async (dispatch, getState) => {
    try {
      dispatch({ type: AGENT_CREATE_REQUEST });
  
      const { data } = await axios.post(`${base_url}`, agent);
  
      dispatch({
        type: AGENT_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: AGENT_CREATE_FAIL,
        payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
    }
  };
  
export const updateAgent = (agent) => async (dispatch) => {
    try {
      dispatch({ type: AGENT_UPDATE_REQUEST });
  
      const { data } = await axios.put(`${base_url}/${agent._id}`, agent);
  
      dispatch({
        type: AGENT_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: AGENT_UPDATE_FAIL,
        payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
    }
  };

export const deleteAgent = (id) => async (dispatch) => {
    try {
      dispatch({ type: AGENT_DELETE_REQUEST });
  
      await axios.delete(`${base_url}/${id}`);
  
      dispatch({ type: AGENT_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: AGENT_DELETE_FAIL,
        payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
    }
  };
  