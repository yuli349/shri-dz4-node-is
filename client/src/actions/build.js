import axios from "axios";
import {setBuild} from "../reducers/buildReducer";
import {setIsFetching} from "../reducers/listReducer";

export function createBuild(commitHash) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:3000/api/builds/${commitHash}`);
      dispatch(setBuild(response.data));
      console.log('1');
      console.log(response.data.config.data);
      dispatch(setIsFetching(false));
      console.log('2');
    } catch (e) {
      console.log(e);
    }
  }

}
