import axios from 'axios';
import {
  ALL_STUDENTS_FAIL,
  ALL_STUDENTS_REQUEST,
  ALL_STUDENTS_SUCCESS,
  CREATE_STUDENT_FAIL,
  CREATE_STUDENT_REQUEST,
  CREATE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  INDIVIDUAL_STUDENT_FAIL,
  UPDATE_STUDENT_FAIL,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  INDIVIDUAL_STUDENT_SUCCESS,
  INDIVIDUAL_STUDENT_REQUEST
} from '../constants/studentConstants';

const base_url = 'http://localhost:5000/api/students';

// List all students
export const listStudents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_STUDENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(base_url, config);

    dispatch({
      type: ALL_STUDENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create a new student
export const createStudent = (studentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_STUDENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(base_url, studentData, config);

    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get student by ID
export const getStudentById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INDIVIDUAL_STUDENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${base_url}/${id}`, config);

    dispatch({
      type: INDIVIDUAL_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update student by ID
export const updateStudentById = (id, updatedStudentData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_STUDENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${base_url}/${id}`,
      updatedStudentData,
      config
    );

    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete student by ID
export const deleteStudentById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_STUDENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${base_url}/${id}`, config);

    dispatch({
      type: DELETE_STUDENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
