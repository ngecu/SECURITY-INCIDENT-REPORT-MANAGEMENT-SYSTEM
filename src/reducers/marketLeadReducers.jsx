import { ALL_MARKET_LEAD_FAIL, ALL_MARKET_LEAD_REQUEST, ALL_MARKET_LEAD_SUCCESS, INDIVIDUAL_MARKET_LEAD_FAIL, INDIVIDUAL_MARKET_LEAD_REQUEST, INDIVIDUAL_MARKET_LEAD_SUCCESS, MARKET_LEAD_REGISTER_FAIL, MARKET_LEAD_REGISTER_REQUEST, MARKET_LEAD_REGISTER_SUCCESS, MY_MARKET_LEADS_FAIL, MY_MARKET_LEADS_REQUEST, MY_MARKET_LEADS_SUCCESS, UPDATE_MARKET_LEADS_STATUS_FAIL, UPDATE_MARKET_LEADS_STATUS_REQUEST, UPDATE_MARKET_LEADS_STATUS_SUCCESS } from "../constants/marketingConstants"

export const marketLeadRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_LEAD_REGISTER_REQUEST:
      return { loading: true }
    case MARKET_LEAD_REGISTER_SUCCESS:
      return { loading: false, success:true,lead: action.payload }
    case MARKET_LEAD_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const allMarketLeadsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_MARKET_LEAD_REQUEST:
      return { loading: true }
    case ALL_MARKET_LEAD_SUCCESS:
      return { loading: false, leads: action.payload }
    case ALL_MARKET_LEAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const individualMarketLeadReducer = (state = {}, action) => {
  switch (action.type) {
    case INDIVIDUAL_MARKET_LEAD_REQUEST:
      return { loading: true }
    case INDIVIDUAL_MARKET_LEAD_SUCCESS:
      return { loading: false, lead: action.payload }
    case INDIVIDUAL_MARKET_LEAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const MyMarketLeadsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_MARKET_LEADS_REQUEST:
      return { loading: true }
    case MY_MARKET_LEADS_SUCCESS:
      return { loading: false, leads: action.payload }
    case MY_MARKET_LEADS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateMarketLeadsStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MARKET_LEADS_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_MARKET_LEADS_STATUS_SUCCESS:
      return { loading: false, success: true,lead:action.payload };
    case UPDATE_MARKET_LEADS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

