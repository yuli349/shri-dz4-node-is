import axios from "axios";
import {setList, setIsFetching} from "../reducers/listReducer";

export function getList() {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:3000/api/builds`);
      dispatch(setList(response.data.data));
      dispatch(setIsFetching(false));
    } catch (e) {
      alert(e.response);
    }
  }

}
