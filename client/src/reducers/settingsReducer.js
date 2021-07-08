const SET_SETTINGS = 'SET_SETTINGS';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_ERROR = 'SET_ERROR';

const defaultState = {
  settings: {},
  isFetching: false,
  error: '',
}

export default function settingsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case SET_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings
});
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool});
export const setError = (str) => ({type: SET_ERROR, payload: str});
