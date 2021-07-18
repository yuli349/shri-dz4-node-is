export interface ListState {
  list: any, // подскажите, можно ли было здесь обойтись без any?
  isFetching: boolean,
}

export enum Status {
  Waiting = 'Waiting',
  InProgress = 'InProgress',
  Success = 'Success',
  Fail = 'Fail',
}

export interface getBuilds<T> {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: T;
  start: string;
  duration: number;
}

export enum ListActionTypes {
  SET_LIST = 'SET_LIST',
  SET_CLEAR_LIST = 'SET_CLEAR_LIST',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
}

interface SetClearListAction {
  type: ListActionTypes.SET_CLEAR_LIST;
  payload: any;
}

interface SetListAction {
  type: ListActionTypes.SET_LIST;
  payload: any;
}

interface SetIsFetchingAction {
  type: ListActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

export type ListAction = SetListAction | SetClearListAction | SetIsFetchingAction;
