const SET_BUILD = 'SET_BUILD';
const SET_HASH = 'SET_HASH';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const defaultState = {
  build: {},
  isFetching: true,
  commitHash: '',
}

export default function buildReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_BUILD:
      return {
        ...state,
        build: action.payload,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case SET_HASH:
      return {...state, commitHash: action.payload};
    default:
      return state;
  }
}

export const setBuild = (build) => ({type: SET_BUILD, payload: build});
export const setCommitHash = (hash) => ({type: SET_HASH, payload: hash});
export const setIsFetchingBuild = (bool) => ({type: SET_IS_FETCHING, payload: bool});
