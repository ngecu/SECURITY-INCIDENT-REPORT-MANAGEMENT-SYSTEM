import axios from 'axios';
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
  TERM_DATE_UPDATE_REQUEST,
  TERM_DATE_UPDATE_SUCCESS,
  TERM_DATE_UPDATE_FAIL,
  TERM_DATE_DELETE_REQUEST,
  TERM_DATE_DELETE_SUCCESS,
  TERM_DATE_DELETE_FAIL,
  EVENT_ADD_REQUEST,
  EVENT_ADD_SUCCESS,
  EVENT_ADD_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL
} from '../constants/termDatesConstants';
const base_url = `http://localhost:5000/api/term-dates`

// Fetch all term dates
export const listTermDates = () => async (dispatch) => {
  try {
    dispatch({ type: TERM_DATES_LIST_REQUEST });
    const { data } = await axios.get(`${base_url}`);
    dispatch({ type: TERM_DATES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TERM_DATES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Fetch a single term date by ID
export const getTermDateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TERM_DATE_DETAILS_REQUEST });
    const { data } = await axios.get(`${base_url}/${id}`);
    dispatch({ type: TERM_DATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TERM_DATE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Create a new term date
export const createTermDate = (termDate) => async (dispatch) => {
  try {
    dispatch({ type: TERM_DATE_CREATE_REQUEST });
    const { data } = await axios.post(`${base_url}`, termDate);
    dispatch({ type: TERM_DATE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TERM_DATE_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Update a term date
export const updateTermDate = (id, termDate) => async (dispatch) => {
  try {
    dispatch({ type: TERM_DATE_UPDATE_REQUEST });
    const { data } = await axios.put(`${base_url}/${id}`, termDate);
    dispatch({ type: TERM_DATE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TERM_DATE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Delete a term date
export const deleteTermDate = (id) => async (dispatch) => {
  try {
    dispatch({ type: TERM_DATE_DELETE_REQUEST });
    await axios.delete(`${base_url}/${id}`);
    dispatch({ type: TERM_DATE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TERM_DATE_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Add an event to a term date
export const addEventToTermDate = (termDateId, event) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_ADD_REQUEST });
    const { data } = await axios.post(`${base_url}/${termDateId}/events`, event);
    dispatch({ type: EVENT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_ADD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Update an event within a term date
export const updateEvent = (termDateId, eventId, event) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_UPDATE_REQUEST });
    const { data } = await axios.put(`${base_url}/${termDateId}/events/${eventId}`, event);
    dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Delete an event from a term date
export const deleteEvent = (termDateId, eventId) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DELETE_REQUEST });
    await axios.delete(`${base_url}/${termDateId}/events/${eventId}`);
    dispatch({ type: EVENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
