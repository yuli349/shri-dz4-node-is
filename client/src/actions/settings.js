import axios from "axios";
import {setSettings, setIsFetching} from "../reducers/settingsReducer";

export function getSettings() {
  return async dispatch => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(`http://localhost:3000/api/settings`);
      dispatch(setSettings(response));
      dispatch(setIsFetching(false));
    } catch (e) {
      console.log(e.response?.data.message);
    }
  }
}

export function postSettings(req) {
  return async dispatch => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.post('http://localhost:3000/api/settings', req);
      if (response.status !== 200) {
        throw new Error('error');
      }
      await dispatch(setSettings(response));
    } finally {
      dispatch(setIsFetching(false));
    }
  }
}
