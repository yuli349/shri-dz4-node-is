import {ListAction, ListActionTypes, ListState} from "../../types/list";

const initialState: ListState = {
  list: [],
  isFetching: true,
}

export const listReducer = (state = initialState, action: ListAction): ListState => {
  switch (action.type) {
    case ListActionTypes.SET_CLEAR_LIST:
      return {
        ...state,
        list: [],
      };
    case ListActionTypes.SET_LIST:
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    case ListActionTypes.SET_IS_FETCHING:
      return {...state, isFetching: false};
    default:
      return state;
  }
}

export const setList = (list: any) => ({type: ListActionTypes.SET_LIST, payload: list});
