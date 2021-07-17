export interface SettingsState {
  settings: any,
  isFetching: boolean,
  error: string,
}

export enum SettingsActionTypes {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  SET_ERROR = 'SET_ERROR',
}

export interface SettingsConfig {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

interface SetSettingsAction {
  type: SettingsActionTypes.SET_SETTINGS;
  payload: any;
}

interface SetIsFetchingAction {
  type: SettingsActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

interface SetErrorAction {
  type: SettingsActionTypes.SET_ERROR;
  payload: string;
}

export type SettingsAction = SetSettingsAction | SetIsFetchingAction | SetErrorAction;
