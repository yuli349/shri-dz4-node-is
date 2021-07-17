import axios from "axios";
import {Dispatch} from "redux";
import {BuildAction, BuildActionTypes} from "../../types/build";

export const createBuild = (commitHash: string) => {
  return async (dispatch: Dispatch<BuildAction>) => {
    try {
      dispatch({
        type: BuildActionTypes.SET_IS_FETCHING,
        payload: true
      });
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      await dispatch({
        type: BuildActionTypes.SET_IS_FETCHING,
        payload: false
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export const getBuild = (buildId: string) => {
  return async (dispatch: Dispatch<BuildAction>) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/builds/${buildId}`);
      dispatch({
        type: BuildActionTypes.SET_BUILD,
        payload: response.data
      });
      dispatch({
        type: BuildActionTypes.SET_IS_FETCHING,
        payload: false
      });
    } catch (e) {
      console.log(e);
    }
  }

}

export const getBuildLogs = (buildId: string) => {
  return async (dispatch: Dispatch<BuildAction>) => {
    try {
      dispatch({
        type: BuildActionTypes.SET_IS_FETCHING,
        payload: true
      });
      const response = await axios.get(`http://localhost:3000/api/builds/${buildId}/logs`);
      dispatch({
        type: BuildActionTypes.SET_LOGS,
        payload: response.data
      });
      dispatch({
        type: BuildActionTypes.SET_IS_FETCHING,
        payload: false
      });
    } catch (e) {
      console.log(e);
    }
  }

}
