import axios from 'axios'
import { ALL_SCHOOLS_FAIL, ALL_SCHOOLS_REQUEST, ALL_SCHOOLS_SUCCESS } from "../constants/schoolConstants";
const base_url = `http://localhost:5000/api/schools`

export const listSchools = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ALL_SCHOOLS_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${base_url}/`, config);
  
      dispatch({
        type: ALL_SCHOOLS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SCHOOLS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };