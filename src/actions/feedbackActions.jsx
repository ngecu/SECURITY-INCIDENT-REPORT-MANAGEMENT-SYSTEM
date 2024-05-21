import axios from 'axios';
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

const base_url = `http://localhost:5000/api/feedback/`

// Action to create feedback
export const createFeedback = (feedbackData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_FEEDBACK_REQUEST });
        
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`${base_url}`, feedbackData, config);

        dispatch({
            type: CREATE_FEEDBACK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_FEEDBACK_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

// Action to fetch all feedbacks
export const fetchAllFeedback = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ALL_FEEDBACK_REQUEST });

        const { data } = await axios.get(`${base_url}`);

        dispatch({
            type: FETCH_ALL_FEEDBACK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_ALL_FEEDBACK_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

// Action to fetch single feedback
export const fetchFeedback = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_FEEDBACK_REQUEST });

        const { data } = await axios.get(`${base_url}/${id}`);

        dispatch({
            type: FETCH_FEEDBACK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_FEEDBACK_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

// Action to update feedback
export const updateFeedback = (id, feedbackData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FEEDBACK_REQUEST });

        const { data } = await axios.put(`${base_url}/${id}`, feedbackData);

        dispatch({
            type: UPDATE_FEEDBACK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_FEEDBACK_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

// Action to delete feedback
export const deleteFeedback = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FEEDBACK_REQUEST });

        await axios.delete(`${base_url}/${id}`);

        dispatch({
            type: DELETE_FEEDBACK_SUCCESS,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: DELETE_FEEDBACK_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
