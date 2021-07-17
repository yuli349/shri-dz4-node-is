import axios from "axios";
import {SettingsAction, SettingsActionTypes, SettingsConfig} from "../../types/settings";
import {Dispatch} from "redux";

export const getSettings = () => {
  return async (dispatch: Dispatch<SettingsAction>) => {
    try {
      dispatch({
        type: SettingsActionTypes.SET_IS_FETCHING,
        payload: true
      });
      const response = await axios.get(`http://localhost:3000/api/settings`);
      dispatch({
        type: SettingsActionTypes.SET_SETTINGS,
        payload: response
      });
      dispatch({
        type: SettingsActionTypes.SET_IS_FETCHING,
        payload: false
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export const postSettings = (req: SettingsConfig) => {
  return async (dispatch: Dispatch<SettingsAction>) => {
    try {
      dispatch({
        type: SettingsActionTypes.SET_IS_FETCHING,
        payload: true
      });
      const response = await axios.post('http://localhost:3000/api/settings', req);
      if (response.status !== 200) {
        throw new Error('error');
      }
      await dispatch({
        type: SettingsActionTypes.SET_SETTINGS,
        payload: response
      });
    } finally {
      dispatch({
        type: SettingsActionTypes.SET_IS_FETCHING,
        payload: false
      });
    }
  }
}
