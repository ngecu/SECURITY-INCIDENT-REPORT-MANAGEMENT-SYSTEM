import {
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAILURE,
    FETCH_ALL_FEEDBACK_REQUEST,
    FETCH_ALL_FEEDBACK_SUCCESS,
    FETCH_ALL_FEEDBACK_FAILURE,
    FETCH_FEEDBACK_REQUEST,
    FETCH_FEEDBACK_SUCCESS,
    FETCH_FEEDBACK_FAILURE,
    UPDATE_FEEDBACK_REQUEST,
    UPDATE_FEEDBACK_SUCCESS,
    UPDATE_FEEDBACK_FAILURE,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAILURE
  } from '../constants/feedbackConstants';
  
  // Reducer for creating feedback
  export const createFeedbackReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_FEEDBACK_REQUEST:
        return { loading: true };
      case CREATE_FEEDBACK_SUCCESS:
        return { loading: false, success: true, feedbackInfo: action.payload };
      case CREATE_FEEDBACK_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for fetching all feedbacks
  export const fetchAllFeedbackReducer = (state = { feedbacks: [] }, action) => {
    switch (action.type) {
      case FETCH_ALL_FEEDBACK_REQUEST:
        return { ...state, loading: true };
      case FETCH_ALL_FEEDBACK_SUCCESS:
        return { loading: false, feedbacks: action.payload };
      case FETCH_ALL_FEEDBACK_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for fetching a single feedback by ID
  export const fetchFeedbackReducer = (state = { feedback: {} }, action) => {
    switch (action.type) {
      case FETCH_FEEDBACK_REQUEST:
        return { ...state, loading: true };
      case FETCH_FEEDBACK_SUCCESS:
        return { loading: false, feedback: action.payload };
      case FETCH_FEEDBACK_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for updating feedback
  export const updateFeedbackReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_FEEDBACK_REQUEST:
        return { loading: true };
      case UPDATE_FEEDBACK_SUCCESS:
        return { loading: false, success: true, updatedFeedback: action.payload };
      case UPDATE_FEEDBACK_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for deleting feedback
  export const deleteFeedbackReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_FEEDBACK_REQUEST:
        return { loading: true };
      case DELETE_FEEDBACK_SUCCESS:
        return { loading: false, success: true };
      case DELETE_FEEDBACK_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  