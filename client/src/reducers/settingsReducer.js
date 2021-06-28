const SET_SETTINGS = 'SET_SETTINGS';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const defaultState = {
  settings: {},
  isFetching: true,
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
    default:
      return state;
  }
}

export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings
});
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool});
