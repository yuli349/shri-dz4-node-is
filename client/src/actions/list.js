import axios from "axios";
import {setList} from "../reducers/listReducer";

export function getList(offset, chunks) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:3000/api/builds?offset=${offset}&limit=${chunks}`);
      dispatch(setList(response.data.data));
    } catch (e) {
      alert(e.response);
    }
  }

}
