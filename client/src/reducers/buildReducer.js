const SET_BUILD = 'SET_BUILD';
const SET_IS_FETCHING_BUILD = 'SET_IS_FETCHING_BUILD';

const defaultState = {
  build: {},
  isFetchingBuild: true,
}

export default function buildReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_BUILD:
      return {
        ...state,
        build: action.payload,
        isFetchingBuild: false,
      };
    case SET_IS_FETCHING_BUILD:
      return {...state, isFetchingBuild: action.payload};
    default:
      return state;
  }
}

export const setBuild = (build) => ({type: SET_BUILD, payload: build});
export const setIsFetchingBuild = (bool) => ({type: SET_IS_FETCHING_BUILD, payload: bool});
