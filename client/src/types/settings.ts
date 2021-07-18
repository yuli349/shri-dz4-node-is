export interface SettingsConfig {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

export interface SettingsState {
  settings: SettingsConfig,
  isFetching: boolean,
  error: string,
}

export enum SettingsActionTypes {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  SET_ERROR = 'SET_ERROR',
}

interface SetSettingsAction {
  type: SettingsActionTypes.SET_SETTINGS;
  payload: SettingsConfig;
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
