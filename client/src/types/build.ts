export interface BuildState {
  build: object,
  isFetching: boolean,
  commitHash: string,
  logs: string,
}

export interface BuildConfig {
  data: {
    id: string,
    buildNumber: number,
    status: string
  }
}

export enum BuildActionTypes {
  SET_BUILD = 'SET_BUILD',
  SET_HASH = 'SET_HASH',
  SET_LOGS = 'SET_LOGS',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
}

interface SetBuildAction {
  type: BuildActionTypes.SET_BUILD;
  payload: object;
}

interface SetHashAction {
  type: BuildActionTypes.SET_HASH;
  payload: string;
}

interface SetLogsAction {
  type: BuildActionTypes.SET_LOGS;
  payload: string;
}

interface SetIsFetchingAction {
  type: BuildActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

export type BuildAction =
  SetBuildAction
  | SetHashAction
  | SetLogsAction
  | SetIsFetchingAction;
