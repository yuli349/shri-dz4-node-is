const SET_LIST = 'SET_LIST';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const defaultState = {
  list: {},
  isFetching: true,
}

export default function listReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        list: action.payload,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    default:
      return state;
  }
}

export const setList = (list) => ({type: SET_LIST, payload: list});
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool});
