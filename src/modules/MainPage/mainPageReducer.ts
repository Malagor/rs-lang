import { Reducer } from 'redux';
import { StateMainPage } from 'types';
import { SET_USER } from './actionConst';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const mainPageState: StateMainPage = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  },
};

export const mainPageReducer: Reducer<StateMainPage, Action> = (
  state = mainPageState,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
