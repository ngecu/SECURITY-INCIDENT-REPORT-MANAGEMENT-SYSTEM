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
    FETCH_ALL_EXTERNAL_EXAMS_REQUEST,
    FETCH_ALL_EXTERNAL_EXAMS_SUCCESS,
    FETCH_ALL_EXTERNAL_EXAMS_FAILURE,
    FETCH_EXTERNAL_EXAM_REQUEST,
    FETCH_EXTERNAL_EXAM_SUCCESS,
    FETCH_EXTERNAL_EXAM_FAILURE,
    UPDATE_EXTERNAL_EXAM_REQUEST,
    UPDATE_EXTERNAL_EXAM_SUCCESS,
    UPDATE_EXTERNAL_EXAM_FAILURE,
    DELETE_EXTERNAL_EXAM_REQUEST,
    DELETE_EXTERNAL_EXAM_SUCCESS,
    DELETE_EXTERNAL_EXAM_FAILURE,
    FETCH_ALL_SPECIAL_EXAMS_REQUEST,
    FETCH_ALL_SPECIAL_EXAMS_SUCCESS,
    FETCH_ALL_SPECIAL_EXAMS_FAILURE,
    FETCH_SPECIAL_EXAM_REQUEST,
    FETCH_SPECIAL_EXAM_SUCCESS,
    FETCH_SPECIAL_EXAM_FAILURE,
    UPDATE_SPECIAL_EXAM_REQUEST,
    UPDATE_SPECIAL_EXAM_SUCCESS,
    UPDATE_SPECIAL_EXAM_FAILURE,
    DELETE_SPECIAL_EXAM_REQUEST,
    DELETE_SPECIAL_EXAM_SUCCESS,
    DELETE_SPECIAL_EXAM_FAILURE,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_REQUEST,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_SUCCESS,
    FETCH_ALL_SUPPLEMENTARY_EXAMS_FAILURE,
    FETCH_SUPPLEMENTARY_EXAM_REQUEST,
    FETCH_SUPPLEMENTARY_EXAM_SUCCESS,
    FETCH_SUPPLEMENTARY_EXAM_FAILURE,
    UPDATE_SUPPLEMENTARY_EXAM_REQUEST,
    UPDATE_SUPPLEMENTARY_EXAM_SUCCESS,
    UPDATE_SUPPLEMENTARY_EXAM_FAILURE,
    DELETE_SUPPLEMENTARY_EXAM_REQUEST,
    DELETE_SUPPLEMENTARY_EXAM_SUCCESS,
    DELETE_SUPPLEMENTARY_EXAM_FAILURE
  } from '../constants/examformConstants.jsx';
import axios from 'axios';

  const base_url = `http://localhost:5000/api/externalExams/`
  const base_url2 = `http://localhost:5000/api/specialExams/`
  const base_url3 = `http://localhost:5000/api/supplementaryExams/`

  // External Exam Form Actions
  export const submitExternalExamForm = (formData) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_EXTERNAL_EXAM_FORM_REQUEST });
      const {data} = await axios.post(`${base_url}`,formData);
      dispatch({ type: SUBMIT_EXTERNAL_EXAM_FORM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBMIT_EXTERNAL_EXAM_FORM_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };
  
  // Special Exam Form Actions
  export const submitSpecialExamForm = (formData) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_SPECIAL_EXAM_FORM_REQUEST });
      const {data} = await axios.post(`${base_url2}`,formData);
      dispatch({ type: SUBMIT_SPECIAL_EXAM_FORM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBMIT_SPECIAL_EXAM_FORM_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };
  
  // Supplementary Exam Form Actions
  export const submitSupplementaryExamForm = (formData) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_SUPPLEMENTARY_FORM_REQUEST });
      const {data} = await axios.post(`${base_url3}`,formData);
      dispatch({ type: SUBMIT_SUPPLEMENTARY_FORM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBMIT_SUPPLEMENTARY_FORM_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };
  
  // Actions for external exams
export const fetchAllExternalExams = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_EXTERNAL_EXAMS_REQUEST });
    const { data } = await axios.get(`${base_url}`);
    dispatch({ type: FETCH_ALL_EXTERNAL_EXAMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_EXTERNAL_EXAMS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const fetchExternalExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EXTERNAL_EXAM_REQUEST });
    const { data } = await axios.get(`${base_url}/${id}`);
    dispatch({ type: FETCH_EXTERNAL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EXTERNAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateExternalExam = (id, examData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXTERNAL_EXAM_REQUEST });
    const { data } = await axios.put(`${base_url}/${id}`, examData);
    dispatch({ type: UPDATE_EXTERNAL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_EXTERNAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteExternalExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXTERNAL_EXAM_REQUEST });
    await axios.delete(`${base_url}/${id}`);
    dispatch({ type: DELETE_EXTERNAL_EXAM_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: DELETE_EXTERNAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Actions for special exams
export const fetchAllSpecialExams = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SPECIAL_EXAMS_REQUEST });
    const { data } = await axios.get(`${base_url2}`);
    dispatch({ type: FETCH_ALL_SPECIAL_EXAMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SPECIAL_EXAMS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const fetchSpecialExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SPECIAL_EXAM_REQUEST });
    const { data } = await axios.get(`${base_url2}/${id}`);
    dispatch({ type: FETCH_SPECIAL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SPECIAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateSpecialExam = (id, examData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SPECIAL_EXAM_REQUEST });
    const { data } = await axios.put(`${base_url2}/${id}`, examData);
    dispatch({ type: UPDATE_SPECIAL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SPECIAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteSpecialExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SPECIAL_EXAM_REQUEST });
    await axios.delete(`${base_url2}/${id}`);
    dispatch({ type: DELETE_SPECIAL_EXAM_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: DELETE_SPECIAL_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Actions for supplementary exams
export const fetchAllSupplementaryExams = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SUPPLEMENTARY_EXAMS_REQUEST });
    const { data } = await axios.get(`${base_url3}`);
    dispatch({ type: FETCH_ALL_SUPPLEMENTARY_EXAMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SUPPLEMENTARY_EXAMS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const fetchSupplementaryExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SUPPLEMENTARY_EXAM_REQUEST });
    const { data } = await axios.get(`${base_url3}/${id}`);
    dispatch({ type: FETCH_SUPPLEMENTARY_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SUPPLEMENTARY_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateSupplementaryExam = (id, examData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPPLEMENTARY_EXAM_REQUEST });
    const { data } = await axios.put(`${base_url3}/${id}`, examData);
    dispatch({ type: UPDATE_SUPPLEMENTARY_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLEMENTARY_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteSupplementaryExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUPPLEMENTARY_EXAM_REQUEST });
    await axios.delete(`${base_url3}/${id}`);
    dispatch({ type: DELETE_SUPPLEMENTARY_EXAM_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: DELETE_SUPPLEMENTARY_EXAM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
