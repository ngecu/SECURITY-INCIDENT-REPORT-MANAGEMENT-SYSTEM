import {
    REQUISITION_CREATE_FAIL,
    REQUISITION_CREATE_SUCCESS,
    ALL_REQUISITIONS_FAIL,
    ALL_REQUISITIONS_REQUEST,
    ALL_REQUISITIONS_SUCCESS,
    INDIVIDUAL_REQUISITION_FAIL,
    INDIVIDUAL_REQUISITION_REQUEST,
    INDIVIDUAL_REQUISITION_SUCCESS,
    CREATE_REQUISITION_REQUEST,
    DEPARTMENT_REQUISITION_LIST_REQUEST,
    DEPARTMENT_REQUISITION_LIST_SUCCESS,
    DEPARTMENT_REQUISITION_LIST_FAIL,
    REQUISITION_APPROVE_SUCCESS,
    REQUISITION_APPROVE_REQUEST,
    REQUISITION_APPROVE_FAIL,
  } from "../constants/requisitionConstants";
  
  export const requisitionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_REQUISITION_REQUEST:
        return { loading: true };
      case REQUISITION_CREATE_SUCCESS:
        return { loading: false, success: true, requisition: action.payload };
      case REQUISITION_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const allRequisitionsReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_REQUISITIONS_REQUEST:
        return { loading: true };
      case ALL_REQUISITIONS_SUCCESS:
        return { loading: false, requisitions: action.payload };
      case ALL_REQUISITIONS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const individualRequisitionReducer = (state = {}, action) => {
    switch (action.type) {
      case INDIVIDUAL_REQUISITION_REQUEST:
        return { loading: true };
      case INDIVIDUAL_REQUISITION_SUCCESS:
        return { loading: false, requisition: action.payload };
      case INDIVIDUAL_REQUISITION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const departmentRequisitionListReducer = (state = { requisitions: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case DEPARTMENT_REQUISITION_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case DEPARTMENT_REQUISITION_LIST_SUCCESS:
            return { ...state, loading: false, requisitions: action.payload };
        case DEPARTMENT_REQUISITION_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const requisitionApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUISITION_APPROVE_REQUEST:
      return { loading: true };    
    case REQUISITION_APPROVE_SUCCESS:
      return { loading: false, success: true, requisitionInfo: action.payload };
    case REQUISITION_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};