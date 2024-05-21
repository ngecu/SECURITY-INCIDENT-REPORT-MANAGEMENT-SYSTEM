import {
    AGENT_LIST_REQUEST,
    AGENT_LIST_SUCCESS,
    AGENT_LIST_FAIL,
    AGENT_DETAILS_REQUEST,
    AGENT_DETAILS_SUCCESS,
    AGENT_DETAILS_FAIL,
    AGENT_UPDATE_REQUEST,
    AGENT_UPDATE_SUCCESS,
    AGENT_UPDATE_FAIL,
    AGENT_UPDATE_RESET,
    AGENT_DELETE_REQUEST,
    AGENT_DELETE_SUCCESS,
    AGENT_DELETE_FAIL,
    AGENT_CREATE_REQUEST,
    AGENT_CREATE_SUCCESS,
    AGENT_CREATE_FAIL,
    AGENT_CREATE_RESET,
  } from '../constants/agentConstants';
  
  // Reducer for listing agents
  export const agentListReducer = (state = { agents: [] }, action) => {
    switch (action.type) {
      case AGENT_LIST_REQUEST:
        return { loading: true };
      case AGENT_LIST_SUCCESS:
        return { loading: false, agents: action.payload };
      case AGENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for getting agent details
  export const agentDetailsReducer = (state = { agent: {} }, action) => {
    switch (action.type) {
      case AGENT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case AGENT_DETAILS_SUCCESS:
        return { loading: false, agent: action.payload };
      case AGENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for updating an agent
  export const agentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case AGENT_UPDATE_REQUEST:
        return { loading: true };
      case AGENT_UPDATE_SUCCESS:
        return { loading: false, success: true, agent: action.payload };
      case AGENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case AGENT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  // Reducer for deleting an agent
  export const agentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case AGENT_DELETE_REQUEST:
        return { loading: true };
      case AGENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case AGENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for creating a new agent
  export const agentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case AGENT_CREATE_REQUEST:
        return { loading: true };
      case AGENT_CREATE_SUCCESS:
        return { loading: false, success: true, agent: action.payload };
      case AGENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case AGENT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  