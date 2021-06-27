import axios from "axios";
import {setBuild, setIsFetchingBuild} from "../reducers/buildReducer";

export function sendBuild(commitHash) {
  return async dispatch => {
    try {
      dispatch(setIsFetchingBuild(true));
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      dispatch(setBuild(response.data.data));
      console.log(response.data.data);
    } catch (e) {
      alert(e.response);
    }
  }

}
