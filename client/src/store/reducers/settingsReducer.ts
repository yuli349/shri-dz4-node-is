import {
  SettingsAction,
  SettingsActionTypes,
  SettingsState,
  SettingsConfig
} from "../../types/settings";

export const initialState: SettingsState = {
  settings: {
    repoName: '',
    buildCommand: '',
    mainBranch: 'master',
    period: 0,
  },
  isFetching: false,
  error: '',
}

export const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case SettingsActionTypes.SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case SettingsActionTypes.SET_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export const setSettings = (settings: SettingsConfig) => ({
  type: SettingsActionTypes.SET_SETTINGS,
  payload: settings
});
export const setIsFetching = (bool: boolean) => ({
  type: SettingsActionTypes.SET_IS_FETCHING,
  payload: bool
});
export const setError = (str: string) => ({
  type: SettingsActionTypes.SET_ERROR,
  payload: str
});
