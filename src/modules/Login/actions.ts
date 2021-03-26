import { Auth, StateMainPage, User } from 'types';
import { database, LocStore } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_USER, SET_AUTH } from './actionConsts';

export const setUser = (payload: User) => ({
  type: SET_USER,
  payload,
});

export const setAuth = (payload: Auth) => ({
  type: SET_AUTH,
  payload,
});

export const logInUser = (
  email: string,
  password: string
): ThunkAction<void, Auth, unknown, Action<string>> => async (dispatch) =>
  database.loginUser({ email, password }).then((user) => {
    dispatch(setAuth(user));
  });

export const logOutUser = (): ThunkAction<
  void,
  StateMainPage,
  unknown,
  Action<string>
> => async (dispatch) => {
  const user = {
    id: '',
    name: '',
    email: '',
    password: '',
    avatar: '',
  };
  const auth = {
    userId: '',
    name: '',
    token: '',
    refreshToken: '',
    message: '',
  };

  dispatch(setUser(user));
  dispatch(setAuth(auth));
  LocStore.deleteUser();
};

export const loadUserInfoById = (
  id: string
): ThunkAction<void, StateMainPage, unknown, Action<string>> => (dispatch) =>
  database.getUserById(id).then((user: User) => {
    if (user) {
      dispatch(setUser(user));
    }
  });
