import axios from "axios";
import {setBuild, setIsFetchingBuild} from "../reducers/buildReducer";

export function createBuild(commitHash) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      dispatch(setBuild(response.data));
      dispatch(setIsFetchingBuild(false));
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
