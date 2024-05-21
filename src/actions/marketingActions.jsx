import axios from 'axios'
import { ALL_MARKET_LEAD_FAIL, ALL_MARKET_LEAD_REQUEST, ALL_MARKET_LEAD_SUCCESS, DOWNLOAD_ALL_LEADS_EXCEL_FAILURE, DOWNLOAD_ALL_LEADS_EXCEL_REQUEST, DOWNLOAD_ALL_LEADS_EXCEL_SUCCESS, DOWNLOAD_LEADS_BY_AGENT_EXCEL_FAILURE, DOWNLOAD_LEADS_BY_AGENT_EXCEL_REQUEST, DOWNLOAD_LEADS_BY_AGENT_EXCEL_SUCCESS, DOWNLOAD_LEAD_BY_ID_EXCEL_FAILURE, DOWNLOAD_LEAD_BY_ID_EXCEL_REQUEST, DOWNLOAD_LEAD_BY_ID_EXCEL_SUCCESS, INDIVIDUAL_MARKET_LEAD_FAIL, INDIVIDUAL_MARKET_LEAD_REQUEST, INDIVIDUAL_MARKET_LEAD_SUCCESS, MARKET_LEAD_REGISTER_FAIL, MARKET_LEAD_REGISTER_REQUEST, MARKET_LEAD_REGISTER_SUCCESS, MY_MARKET_LEADS_FAIL, MY_MARKET_LEADS_REQUEST, MY_MARKET_LEADS_SUCCESS, UPDATE_MARKET_LEADS_STATUS_FAIL, UPDATE_MARKET_LEADS_STATUS_REQUEST, UPDATE_MARKET_LEADS_STATUS_SUCCESS} from '../constants/marketingConstants'


const base_url = `http://localhost:5000/api/marketing`

export const registerMarketLead = (values) => async (dispatch) => {
  try {
    dispatch({
      type: MARKET_LEAD_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${base_url}`,values,config
    )

    dispatch({
      type: MARKET_LEAD_REGISTER_SUCCESS,
      payload: data,
    })

} catch (error) {
    dispatch({
      type: MARKET_LEAD_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const allMarketLeads = () => async (dispatch) => {
    try {
      dispatch({
        type: ALL_MARKET_LEAD_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(
        `${base_url}`,config
      )
  
      dispatch({
        type: ALL_MARKET_LEAD_SUCCESS,
        payload: data,
      })
  
  } catch (error) {
      dispatch({
        type: ALL_MARKET_LEAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const individualMarketLead = (id) => async (dispatch) => {
    try {
      dispatch({
        type: INDIVIDUAL_MARKET_LEAD_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(
        `${base_url}/${id}`,config
      )
  
      dispatch({
        type: INDIVIDUAL_MARKET_LEAD_SUCCESS,
        payload: data,
      })
  
  } catch (error) {
      dispatch({
        type: INDIVIDUAL_MARKET_LEAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
 }

export const MyMarketLead = (id) => async (dispatch) => {
    try {
      dispatch({
        type: MY_MARKET_LEADS_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(
        `${base_url}/agent/${id}`,config
      )
  
      dispatch({
        type: MY_MARKET_LEADS_SUCCESS,
        payload: data,
      })
  
  } catch (error) {
      dispatch({
        type: MY_MARKET_LEADS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
 }

export const updateMarketLeadStatus = (id,body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MARKET_LEADS_STATUS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `${base_url}/status/${id}`,body,config
    )

    dispatch({
      type: UPDATE_MARKET_LEADS_STATUS_SUCCESS,
      payload: data,
    })

} catch (error) {
    dispatch({
      type: UPDATE_MARKET_LEADS_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const downloadAllMarketLeads = () => async (dispatch) => {
  try {
    dispatch({
      type: DOWNLOAD_ALL_LEADS_EXCEL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',  // Set responseType as 'blob'
    };

    const response = await axios.get(`${base_url}/excel`, config);

    dispatch({
      type: DOWNLOAD_ALL_LEADS_EXCEL_SUCCESS,
    });

    // Create a new Blob object using the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element, use it to download the file and then remove it
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'All_Marketing_Leads.xlsx';
    link.click();
    window.URL.revokeObjectURL(link.href);

  } catch (error) {
    dispatch({
      type: DOWNLOAD_ALL_LEADS_EXCEL_FAILURE,
      payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const downloadLeadsByAgentExcel = (agentId) => async (dispatch) => {
  try {
    dispatch({
      type: DOWNLOAD_LEADS_BY_AGENT_EXCEL_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob' // Ensure the server responds with the correct content-type
    };

    const response = await axios.get(`${base_url}/excel/agent/${agentId}`, config);

    dispatch({
      type: DOWNLOAD_LEADS_BY_AGENT_EXCEL_SUCCESS
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Leads_by_Agent_${agentId}.xlsx`); // or any other extension
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link); // Clean up and remove the link when done
  } catch (error) {
    dispatch({
      type: DOWNLOAD_LEADS_BY_AGENT_EXCEL_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const downloadLeadByIdExcel = (leadId) => async (dispatch) => {
  try {
    dispatch({
      type: DOWNLOAD_LEAD_BY_ID_EXCEL_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    };

    const { data } = await axios.get(
      `/api/marketing-leads/excel/${leadId}`, config
    );

    dispatch({
      type: DOWNLOAD_LEAD_BY_ID_EXCEL_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: DOWNLOAD_LEAD_BY_ID_EXCEL_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
