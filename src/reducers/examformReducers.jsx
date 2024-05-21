import {
    SUBMIT_EXTERNAL_EXAM_FORM_REQUEST,
    SUBMIT_EXTERNAL_EXAM_FORM_SUCCESS,
    SUBMIT_EXTERNAL_EXAM_FORM_FAILURE,
    SUBMIT_SPECIAL_EXAM_FORM_REQUEST,
    SUBMIT_SPECIAL_EXAM_FORM_SUCCESS,
    SUBMIT_SPECIAL_EXAM_FORM_FAILURE,
    SUBMIT_SUPPLEMENTARY_FORM_REQUEST,
    SUBMIT_SUPPLEMENTARY_FORM_SUCCESS,
    SUBMIT_SUPPLEMENTARY_FORM_FAILURE,
    FETCH_EXTERNAL_EXAM_REQUEST,
    FETCH_EXTERNAL_EXAM_SUCCESS,
    UPDATE_EXTERNAL_EXAM_SUCCESS,
    FETCH_EXTERNAL_EXAM_FAILURE,
    UPDATE_EXTERNAL_EXAM_FAILURE,
    FETCH_ALL_EXTERNAL_EXAMS_REQUEST,
    FETCH_ALL_EXTERNAL_EXAMS_SUCCESS,
    FETCH_ALL_EXTERNAL_EXAMS_FAILURE,
    DELETE_EXTERNAL_EXAM_SUCCESS,
    FETCH_SPECIAL_EXAM_REQUEST,
    UPDATE_SPECIAL_EXAM_REQUEST,
    FETCH_SPECIAL_EXAM_SUCCESS,
    UPDATE_SPECIAL_EXAM_SUCCESS,
    FETCH_SPECIAL_EXAM_FAILURE,
    UPDATE_SPECIAL_EXAM_FAILURE,
    FETCH_ALL_SPECIAL_EXAMS_REQUEST,
    FETCH_ALL_SPECIAL_EXAMS_SUCCESS,
    FETCH_ALL_SPECIAL_EXAMS_FAILURE,
    DELETE_SPECIAL_EXAM_SUCCESS,
    FETCH_SUPPLEMENTARY_EXAM_REQUEST,
    UPDATE_SUPPLEMENTARY_EXAM_REQUEST,
    FETCH_SUPPLEMENTARY_EXAM_SUCCESS,
    UPDATE_SUPPLEMENTARY_EXAM_SUCCESS,
    FETCH_SUPPLEMENTARY_EXAM_FAILURE,
    UPDATE_SUPPLEMENTARY_EXAM_FAILURE,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_REQUEST,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_SUCCESS,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_FAILURE,
    DELETE_SUPPLEMENTARY_EXAM_SUCCESS,
  } from '../constants/examformConstants.jsx';
  

  // Reducer for external exam form submissions
  export const submitexternalExamFormReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMIT_EXTERNAL_EXAM_FORM_REQUEST:
        return { loading: true };
      case SUBMIT_EXTERNAL_EXAM_FORM_SUCCESS:
        return { loading: false, data: action.payload,success:true };
      case SUBMIT_EXTERNAL_EXAM_FORM_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for special exam form submissions
  export const submitspecialExamFormReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMIT_SPECIAL_EXAM_FORM_REQUEST:
        return { loading: true };
      case SUBMIT_SPECIAL_EXAM_FORM_SUCCESS:
        return { loading: false, data: action.payload,success:true };
      case SUBMIT_SPECIAL_EXAM_FORM_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for supplementary exam form submissions
  export const submitsupplementaryExamFormReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMIT_SUPPLEMENTARY_FORM_REQUEST:
        return { loading: true };
      case SUBMIT_SUPPLEMENTARY_FORM_SUCCESS:
        return { loading: false, data: action.payload,success:true };
      case SUBMIT_SUPPLEMENTARY_FORM_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

// Reducer for external exam form submissions
export const externalExamFormReducer = (state = {}, action) => {
  switch (action.type) {
      case FETCH_EXTERNAL_EXAM_REQUEST:
          return { loading: true };
      case FETCH_EXTERNAL_EXAM_SUCCESS:
      case UPDATE_EXTERNAL_EXAM_SUCCESS:
          return { loading: false, data: action.payload, success: true };
      case FETCH_EXTERNAL_EXAM_FAILURE:
      case UPDATE_EXTERNAL_EXAM_FAILURE:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for external exam listings
export const externalExamListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
      case FETCH_ALL_EXTERNAL_EXAMS_REQUEST:
          return { loading: true, exams: [] };
      case FETCH_ALL_EXTERNAL_EXAMS_SUCCESS:
          return { loading: false, exams: action.payload };
      case FETCH_ALL_EXTERNAL_EXAMS_FAILURE:
          return { loading: false, error: action.payload, exams: [] };
      case DELETE_EXTERNAL_EXAM_SUCCESS:
          return {
              ...state,
              exams: state.exams.filter(({ _id }) => _id !== action.payload.id),
              success: true
          };
      default:
          return state;
  }
};

// Reducer for special exam form submissions
export const specialExamFormReducer = (state = {}, action) => {
  switch (action.type) {
      case FETCH_SPECIAL_EXAM_REQUEST:
      case UPDATE_SPECIAL_EXAM_REQUEST:
          return { loading: true };
      case FETCH_SPECIAL_EXAM_SUCCESS:
      case UPDATE_SPECIAL_EXAM_SUCCESS:
          return { loading: false, data: action.payload, success: true };
      case FETCH_SPECIAL_EXAM_FAILURE:
      case UPDATE_SPECIAL_EXAM_FAILURE:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for special exam listings
export const specialExamListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
      case FETCH_ALL_SPECIAL_EXAMS_REQUEST:
          return { loading: true, exams: [] };
      case FETCH_ALL_SPECIAL_EXAMS_SUCCESS:
          return { loading: false, exams: action.payload };
      case FETCH_ALL_SPECIAL_EXAMS_FAILURE:
          return { loading: false, error: action.payload, exams: [] };
      case DELETE_SPECIAL_EXAM_SUCCESS:
          return {
              ...state,
              exams: state.exams.filter(({ _id }) => _id !== action.payload.id),
              success: true
          };
      default:
          return state;
  }
};

// Reducer for supplementary exam form submissions
export const supplementaryExamFormReducer = (state = {}, action) => {
  switch (action.type) {
      case FETCH_SUPPLEMENTARY_EXAM_REQUEST:
      case UPDATE_SUPPLEMENTARY_EXAM_REQUEST:
          return { loading: true };
      case FETCH_SUPPLEMENTARY_EXAM_SUCCESS:
      case UPDATE_SUPPLEMENTARY_EXAM_SUCCESS:
          return { loading: false, data: action.payload, success: true };
      case FETCH_SUPPLEMENTARY_EXAM_FAILURE:
      case UPDATE_SUPPLEMENTARY_EXAM_FAILURE:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for supplementary exam listings
export const supplementaryExamListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
      case FETCH_ALL_SUPPLEMENTARY_EXAMS_REQUEST:
          return { loading: true, exams: [] };
      case FETCH_ALL_SUPPLEMENTARY_EXAMS_SUCCESS:
          return { loading: false, exams: action.payload };
      case FETCH_ALL_SUPPLEMENTARY_EXAMS_FAILURE:
          return { loading: false, error: action.payload, exams: [] };
      case DELETE_SUPPLEMENTARY_EXAM_SUCCESS:
          return {
              ...state,
              exams: state.exams.filter(({ _id }) => _id !== action.payload.id),
              success: true
          };
      default:
          return state;
  }
};
