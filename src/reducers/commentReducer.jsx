import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, FETCH_ALL_COMMENTS_FAIL, FETCH_ALL_COMMENTS_REQUEST, FETCH_ALL_COMMENTS_SUCCESS, FETCH_ALL_TODAYS_COMMENTS_FAIL, FETCH_ALL_TODAYS_COMMENTS_REQUEST, FETCH_ALL_TODAYS_COMMENTS_SUCCESS, FETCH_COMMENTS_BY_AGENT_FAIL, FETCH_COMMENTS_BY_AGENT_REQUEST, FETCH_COMMENTS_BY_AGENT_SUCCESS, FETCH_COMMENTS_BY_LEAD_FAIL, FETCH_COMMENTS_BY_LEAD_REQUEST, FETCH_COMMENTS_BY_LEAD_SUCCESS, FETCH_MY_TODAYS_COMMENTS_FAIL, FETCH_MY_TODAYS_COMMENTS_REQUEST, FETCH_MY_TODAYS_COMMENTS_SUCCESS } from '../constants/commentConstants'

export const addCommentReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_COMMENT_REQUEST:
        return { loading: true }
      case ADD_COMMENT_SUCCESS:
        return { loading: false, success:true }
      case ADD_COMMENT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  
export function commentsByLeadReducer(state = { comments: [] }, action) {
  switch (action.type) {
      case FETCH_COMMENTS_BY_LEAD_REQUEST:
          return { loading: true };
      case FETCH_COMMENTS_BY_LEAD_SUCCESS:
          return { loading: false, comments: action.payload };
      case FETCH_COMMENTS_BY_LEAD_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
}

export function commentsByAgentReducer(state = { comments: [] }, action) {
  switch (action.type) {
      case FETCH_COMMENTS_BY_AGENT_REQUEST:
          return { loading: true };
      case FETCH_COMMENTS_BY_AGENT_SUCCESS:
          return { loading: false, comments: action.payload };
      case FETCH_COMMENTS_BY_AGENT_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
}

export function allCommentsReducer(state = { comments: [] }, action) {
  switch (action.type) {
      case FETCH_ALL_COMMENTS_REQUEST:
          return { loading: true };
      case FETCH_ALL_COMMENTS_SUCCESS:
          return { loading: false, comments: action.payload };
      case FETCH_ALL_COMMENTS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
}

export const fetchMyTodaysCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MY_TODAYS_COMMENTS_REQUEST:
      return {
        loading: true,
        error: null
      };
    case FETCH_MY_TODAYS_COMMENTS_SUCCESS:
      return {
        loading: false,
        myComments: action.payload,
        error: null
      };
    case FETCH_MY_TODAYS_COMMENTS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const fetchAllTodaysCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_TODAYS_COMMENTS_REQUEST:
      return {
        loading: true,
        error: null
      };
    case FETCH_ALL_TODAYS_COMMENTS_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
        error: null
      };
    case FETCH_ALL_TODAYS_COMMENTS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};