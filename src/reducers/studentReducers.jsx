import { ALL_STUDENTS_FAIL, ALL_STUDENTS_REQUEST, ALL_STUDENTS_SUCCESS, INDIVIDUAL_STUDENT_FAIL, INDIVIDUAL_STUDENT_REQUEST, INDIVIDUAL_STUDENT_SUCCESS } from "../constants/studentConstants"


export const allStudentsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_STUDENTS_REQUEST:
      return { loading: true }
    case ALL_STUDENTS_SUCCESS:
      return { loading: false, students: action.payload }
    case ALL_STUDENTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const individualStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case INDIVIDUAL_STUDENT_REQUEST:
      return { loading: true }
    case INDIVIDUAL_STUDENT_SUCCESS:
      return { loading: false, student: action.payload }
    case INDIVIDUAL_STUDENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

