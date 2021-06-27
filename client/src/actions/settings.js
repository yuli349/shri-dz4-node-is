import axios from "axios";
import {setSettings, setIsFetching} from "../reducers/settingsReducer";

export function getSettings() {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:3000/api/settings`);
      dispatch(setSettings(response));
      dispatch(setIsFetching(false));
    } catch (e) {
      alert(e.response?.data.message);
    }
  }

}

export function postSettings(req) {
  console.log(req);
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:3000/api/settings', req);
      dispatch(setSettings(response));
    } catch (e) {
      alert(e.response?.data.message);
    }
  }

}
