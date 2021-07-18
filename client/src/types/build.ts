export interface getBuildDetails {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: string;
  start: string;
  duration: number;
}

export interface BuildState {
  build: getBuildDetails,
  isFetching: boolean,
  commitHash: string,
  logs: string,
}

export interface BuildConfig {
  data: {
    authorName: string,
    branchName: string,
    buildId: string,
    buildLog: string,
    buildNumber: number,
    commitMessage: string,
    duration: number,
    start: string,
    success: boolean
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
  payload: getBuildDetails;
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
