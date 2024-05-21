// Filename: reducers/leaveReducers.js
import {
    LEAVE_REQUEST,
    LEAVE_SUCCESS,
    LEAVE_FAIL,
    LEAVE_LIST_REQUEST,
    LEAVE_LIST_SUCCESS,
    LEAVE_LIST_FAIL,
    LEAVE_UPDATE_REQUEST,
    LEAVE_UPDATE_SUCCESS,
    LEAVE_UPDATE_FAIL,
    LEAVE_DELETE_REQUEST,
    LEAVE_DELETE_SUCCESS,
    LEAVE_DELETE_FAIL,
    LEAVE_DETAILS_REQUEST,
    LEAVE_DETAILS_SUCCESS,
    LEAVE_DETAILS_FAIL,
    LEAVE_CREATE_REQUEST,
    LEAVE_CREATE_SUCCESS,
    LEAVE_CREATE_FAIL,
    LEAVE_RESET,
    USER_LEAVE_DETAILS_REQUEST,
    USER_LEAVE_DETAILS_SUCCESS,
    USER_LEAVE_DETAILS_FAIL
} from '../constants/leaveConstants';

// Handle state for creating a leave
export const leaveCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LEAVE_CREATE_REQUEST:
            return { loading: true };
        case LEAVE_CREATE_SUCCESS:
            return { loading: false, success: true, leave: action.payload };
        case LEAVE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case LEAVE_RESET:
            return {};
        default:
            return state;
    }
};

// Handle state for deleting a leave
export const leaveDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case LEAVE_DELETE_REQUEST:
            return { loading: true };
        case LEAVE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case LEAVE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Handle state for updating a leave
export const leaveUpdateReducer = (state = { leave: {} }, action) => {
    switch (action.type) {
        case LEAVE_UPDATE_REQUEST:
            return { loading: true };
        case LEAVE_UPDATE_SUCCESS:
            return { loading: false, success: true, leave: action.payload };
        case LEAVE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case LEAVE_RESET:
            return { leave: {} };
        default:
            return state;
    }
};

// Handle state for fetching leave details
export const leaveDetailsReducer = (state = { leave: {} }, action) => {
    switch (action.type) {
        case LEAVE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case LEAVE_DETAILS_SUCCESS:
            return { loading: false, leave: action.payload };
        case LEAVE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Handle state for listing all leaves
export const leaveListReducer = (state = { leaves: [] }, action) => {
    switch (action.type) {
        case LEAVE_LIST_REQUEST:
            return { loading: true, leaves: [] };
        case LEAVE_LIST_SUCCESS:
            return { loading: false, leaves: action.payload };
        case LEAVE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
    
};

export const leaveUserDetailsReducer = (state = { leaves: [] }, action) => {
    switch (action.type) {
        case USER_LEAVE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case USER_LEAVE_DETAILS_SUCCESS:
            return { loading: false, leaves: action.payload };
        case USER_LEAVE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};