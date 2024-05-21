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
    VOTEHEAD_CREATE_RESET,
    VOTEHEAD_UPDATE_REQUEST,
    VOTEHEAD_UPDATE_SUCCESS,
    VOTEHEAD_UPDATE_FAIL,
    VOTEHEAD_UPDATE_RESET,
    VOTEHEAD_DELETE_REQUEST,
    VOTEHEAD_DELETE_SUCCESS,
    VOTEHEAD_DELETE_FAIL,
    VOTEHEAD_DELETE_RESET,
  } from '../constants/voteheadConstants';
  
  // Reducer for listing all voteheads
  export const voteheadListReducer = (state = { voteheads: [] }, action) => {
    switch (action.type) {
      case VOTEHEAD_LIST_REQUEST:
        return { loading: true };
      case VOTEHEAD_LIST_SUCCESS:
        return { loading: false, voteheads: action.payload };
      case VOTEHEAD_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for fetching details of a single votehead
  export const voteheadDetailsReducer = (state = { votehead: {} }, action) => {
    switch (action.type) {
      case VOTEHEAD_DETAILS_REQUEST:
        return { ...state, loading: true };
      case VOTEHEAD_DETAILS_SUCCESS:
        return { loading: false, votehead: action.payload };
      case VOTEHEAD_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for creating a votehead
  export const voteheadCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case VOTEHEAD_CREATE_REQUEST:
        return { loading: true };
      case VOTEHEAD_CREATE_SUCCESS:
        return { loading: false, success: true, votehead: action.payload };
      case VOTEHEAD_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case VOTEHEAD_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  // Reducer for updating a votehead
  export const voteheadUpdateReducer = (state = { votehead: {} }, action) => {
    switch (action.type) {
      case VOTEHEAD_UPDATE_REQUEST:
        return { loading: true };
      case VOTEHEAD_UPDATE_SUCCESS:
        return { loading: false, success: true, votehead: action.payload };
      case VOTEHEAD_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case VOTEHEAD_UPDATE_RESET:
        return { votehead: {} };
      default:
        return state;
    }
  };
  
  // Reducer for deleting a votehead
  export const voteheadDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case VOTEHEAD_DELETE_REQUEST:
        return { loading: true };
      case VOTEHEAD_DELETE_SUCCESS:
        return { loading: false, success: true };
      case VOTEHEAD_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case VOTEHEAD_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  