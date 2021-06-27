import axios from "axios";
import {setBuild} from "../reducers/buildReducer";
import {setIsFetching} from "../reducers/listReducer";

export function createBuild(commitHash) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      dispatch(setBuild(response.data));
      dispatch(setIsFetching(false));
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
      console.log(response.data);
      dispatch(setIsFetching(false));
    } catch (e) {
      console.log(e);
    }
  }

}
