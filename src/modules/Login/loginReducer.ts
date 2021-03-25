import { Reducer } from 'redux';
import { StateLogin } from 'types';
import { SET_AUTH, SET_USER } from './actionConsts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const loginState: StateLogin = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    avatar: '',
  },
  auth: {
    userId: '',
    name: '',
    token: '',
    refreshToken: '',
    message: '',
  },
};

export const loginReducer: Reducer<StateLogin, Action> = (
  state = loginState,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};
