import {ListAction, ListActionTypes, ListState} from "../../types/list";

const initialState: ListState = {
  list: [],
  isFetching: true,
}

export const listReducer = (state = initialState, action: ListAction): ListState => {
  switch (action.type) {
    case ListActionTypes.SET_LIST:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isFetching: false,
      };
    case ListActionTypes.SET_IS_FETCHING:
      return {...state, isFetching: false};
    default:
      return state;
  }
}

export const setList = (list: any) => ({type: ListActionTypes.SET_LIST, payload: list});
// export const setIsFetching = (bool) => ({type: ListActionTypes.SET_IS_FETCHING, payload: bool});
