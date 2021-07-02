import axios from "axios";
import {setBuild, setIsFetchingBuild, setLogs} from "../reducers/buildReducer";

export function createBuild(commitHash) {
  return async dispatch => {
    try {
      dispatch(setIsFetchingBuild(true));
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      await dispatch(setIsFetchingBuild(false));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

}

export function getBuild(buildId) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:3000/api/builds/${buildId}`);
      dispatch(setBuild(response.data));
      dispatch(setIsFetchingBuild(false));
    } catch (e) {
      console.log(e);
    }
  }

}

export function getBuildLogs(buildId) {
  return async dispatch => {
    try {
      dispatch(setIsFetchingBuild(true));
      const response = await axios.get(`http://localhost:3000/api/builds/${buildId}/logs`);
      dispatch(setLogs(response.data));
      dispatch(setIsFetchingBuild(false));
    } catch (e) {
      console.log(e);
    }
  }

}
