import {
  BuildAction,
  BuildActionTypes,
  getBuildDetails,
  BuildState
} from "../../types/build";

const initialState: BuildState = {
  build: {
    id: 'string',
    configurationId: 'string',
    buildNumber: 0,
    commitMessage: 'string',
    commitHash: 'string',
    branchName: 'string',
    authorName: 'string',
    status: 'String',
    start: '',
    duration: 0
  },
  isFetching: true,
  commitHash: '',
  logs: '',
}

export const buildReducer = (state = initialState, action: BuildAction): BuildState => {
  switch (action.type) {
    case BuildActionTypes.SET_BUILD:
      return {
        ...state,
        build: action.payload,
      };
    case BuildActionTypes.SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case BuildActionTypes.SET_LOGS:
      return {...state, logs: action.payload};
    case BuildActionTypes.SET_HASH:
      return {...state, commitHash: action.payload};
    default:
      return state;
  }
}

export const setBuild = (build: getBuildDetails) => ({type: BuildActionTypes.SET_BUILD, payload: build});
export const setCommitHash = (hash: string) => ({type: BuildActionTypes.SET_HASH, payload: hash});
export const setLogs = (logs: string) => ({type: BuildActionTypes.SET_LOGS, payload: logs});
export const setIsFetchingBuild = (bool: boolean) => ({type: BuildActionTypes.SET_IS_FETCHING, payload: bool});
