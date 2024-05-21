import axios from 'axios';
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_RESET,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_RESET,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
} from '../constants/courseConstants';

const base_url = `http://localhost:5000/api/courses`

// Action to list courses
export const listCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const { data } = await axios.get(`${base_url}`); // Adjust the endpoint accordingly

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to get details of a course
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/courses/${id}`); // Adjust the endpoint accordingly

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to create a new course
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/courses', courseData, config); // Adjust the endpoint accordingly

    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to update an existing course
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/courses/${id}`, courseData, config); // Adjust the endpoint accordingly

    dispatch({
      type: COURSE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to delete a course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });

    await axios.delete(`/api/courses/${id}`); // Adjust the endpoint accordingly

    dispatch({ type: COURSE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
