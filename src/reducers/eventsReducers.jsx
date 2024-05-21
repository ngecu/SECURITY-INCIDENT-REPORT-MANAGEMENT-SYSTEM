// eventsReducers.js

import {
    EVENT_ADD_REQUEST,
    EVENT_ADD_SUCCESS,
    EVENT_ADD_FAIL,
    EVENT_ADD_RESET,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_RESET,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
  } from '../constants/termDatesConstants';
  
  export const eventAddReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_ADD_REQUEST:
        return { loading: true };
      case EVENT_ADD_SUCCESS:
        return { loading: false, success: true, event: action.payload };
      case EVENT_ADD_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_ADD_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const eventUpdateReducer = (state = { event: {} }, action) => {
    switch (action.type) {
      case EVENT_UPDATE_REQUEST:
        return { loading: true };
      case EVENT_UPDATE_SUCCESS:
        return { loading: false, success: true, event: action.payload };
      case EVENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_UPDATE_RESET:
        return { event: {} };
      default:
        return state;
    }
  };
  
  export const eventDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_DELETE_REQUEST:
        return { loading: true };
      case EVENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EVENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  