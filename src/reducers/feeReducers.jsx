import {
    CREATE_FEE_STRUCTURE_REQUEST,
    CREATE_FEE_STRUCTURE_SUCCESS,
    CREATE_FEE_STRUCTURE_FAIL,
    GET_ALL_FEE_STRUCTURES_REQUEST,
    GET_ALL_FEE_STRUCTURES_SUCCESS,
    GET_ALL_FEE_STRUCTURES_FAIL,
    GET_FEE_STRUCTURE_REQUEST,
    GET_FEE_STRUCTURE_SUCCESS,
    GET_FEE_STRUCTURE_FAIL,
    UPDATE_FEE_STRUCTURE_REQUEST,
    UPDATE_FEE_STRUCTURE_SUCCESS,
    UPDATE_FEE_STRUCTURE_FAIL,
    DELETE_FEE_STRUCTURE_REQUEST,
    DELETE_FEE_STRUCTURE_SUCCESS,
    DELETE_FEE_STRUCTURE_FAIL,
  } from '../constants/feeConstants';
  
  export const createFeeStructureReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_FEE_STRUCTURE_REQUEST:
        return { loading: true };
      case CREATE_FEE_STRUCTURE_SUCCESS:
        return { loading: false, success: true, feeStructures: action.payload };
      case CREATE_FEE_STRUCTURE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllFeeStructuresReducer = (state = { feeStructures: [] }, action) => {
    switch (action.type) {
      case GET_ALL_FEE_STRUCTURES_REQUEST:
        return { loading: true, feeStructures: [] };
      case GET_ALL_FEE_STRUCTURES_SUCCESS:
        return { loading: false, feeStructures: action.payload };
      case GET_ALL_FEE_STRUCTURES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getFeeStructureReducer = (state = { feeStructure: {} }, action) => {
    switch (action.type) {
      case GET_FEE_STRUCTURE_REQUEST:
        return { loading: true, ...state };
      case GET_FEE_STRUCTURE_SUCCESS:
        return { loading: false, feeStructure: action.payload };
      case GET_FEE_STRUCTURE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const updateFeeStructureReducer = (state = { feeStructure: {} }, action) => {
    switch (action.type) {
      case UPDATE_FEE_STRUCTURE_REQUEST:
        return { loading: true };
      case UPDATE_FEE_STRUCTURE_SUCCESS:
        return { loading: false, success: true, feeStructure: action.payload };
      case UPDATE_FEE_STRUCTURE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const deleteFeeStructureReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_FEE_STRUCTURE_REQUEST:
        return { loading: true };
      case DELETE_FEE_STRUCTURE_SUCCESS:
        return { loading: false, success: true };
      case DELETE_FEE_STRUCTURE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  