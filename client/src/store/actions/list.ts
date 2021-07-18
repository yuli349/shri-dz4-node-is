import axios from "axios";
import {Dispatch} from "redux";
import {ListAction, ListActionTypes} from "../../types/list";

export const getList = (offset: number, chunks: number) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      dispatch({
        type: ListActionTypes.SET_CLEAR_LIST,
        payload: []
      });
      const response = await axios.get(`http://localhost:3000/api/builds?offset=${offset}&limit=${chunks}`);
      dispatch({
        type: ListActionTypes.SET_LIST,
        payload: response.data.data
      });
    } catch (e) {
      alert(e.response);
    }
  }
}
