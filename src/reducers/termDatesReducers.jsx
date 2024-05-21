// termDatesReducers.js

import {
    TERM_DATES_LIST_REQUEST,
    TERM_DATES_LIST_SUCCESS,
    TERM_DATES_LIST_FAIL,
    TERM_DATE_DETAILS_REQUEST,
    TERM_DATE_DETAILS_SUCCESS,
    TERM_DATE_DETAILS_FAIL,
    TERM_DATE_CREATE_REQUEST,
    TERM_DATE_CREATE_SUCCESS,
    TERM_DATE_CREATE_FAIL,
    TERM_DATE_CREATE_RESET,
    TERM_DATE_UPDATE_REQUEST,
    TERM_DATE_UPDATE_SUCCESS,
    TERM_DATE_UPDATE_FAIL,
    TERM_DATE_UPDATE_RESET,
    TERM_DATE_DELETE_REQUEST,
    TERM_DATE_DELETE_SUCCESS,
    TERM_DATE_DELETE_FAIL,
  } from '../constants/termDatesConstants';
  
  export const termDatesListReducer = (state = { termDates: [] }, action) => {
    switch (action.type) {
      case TERM_DATES_LIST_REQUEST:
        return { loading: true };
      case TERM_DATES_LIST_SUCCESS:
        return { loading: false, termDates: action.payload };
      case TERM_DATES_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const termDateDetailsReducer = (state = { termDate: { events: [] } }, action) => {
    switch (action.type) {
      case TERM_DATE_DETAILS_REQUEST:
        return { ...state, loading: true };
      case TERM_DATE_DETAILS_SUCCESS:
        return { loading: false, termDate: action.payload };
      case TERM_DATE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const termDateCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TERM_DATE_CREATE_REQUEST:
        return { loading: true };
      case TERM_DATE_CREATE_SUCCESS:
        return { loading: false, success: true, termDate: action.payload };
      case TERM_DATE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case TERM_DATE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const termDateUpdateReducer = (state = { termDate: {} }, action) => {
    switch (action.type) {
      case TERM_DATE_UPDATE_REQUEST:
        return { loading: true };
      case TERM_DATE_UPDATE_SUCCESS:
        return { loading: false, success: true, termDate: action.payload };
      case TERM_DATE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case TERM_DATE_UPDATE_RESET:
        return { termDate: {} };
      default:
        return state;
    }
  };
  
  export const termDateDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TERM_DATE_DELETE_REQUEST:
        return { loading: true };
      case TERM_DATE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TERM_DATE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  