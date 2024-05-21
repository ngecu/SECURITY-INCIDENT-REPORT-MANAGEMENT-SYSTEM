import { ALL_SCHOOLS_FAIL, ALL_SCHOOLS_REQUEST, ALL_SCHOOLS_SUCCESS, INDIVIDUAL_SCHOOL_FAIL, INDIVIDUAL_SCHOOL_REQUEST, INDIVIDUAL_SCHOOL_SUCCESS } from "../constants/schoolConstants"


export const allSchoolsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SCHOOLS_REQUEST:
      return { loading: true }
    case ALL_SCHOOLS_SUCCESS:
      return { loading: false, schools: action.payload }
    case ALL_SCHOOLS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const individualSchoolReducer = (state = {}, action) => {
  switch (action.type) {
    case INDIVIDUAL_SCHOOL_REQUEST:
      return { loading: true }
    case INDIVIDUAL_SCHOOL_SUCCESS:
      return { loading: false, lead: action.payload }
    case INDIVIDUAL_SCHOOL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

