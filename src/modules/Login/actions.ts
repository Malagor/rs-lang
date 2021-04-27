import { Auth, StateMainPage, User } from 'types';
import { database, LocStore } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { setGroup, setPage } from 'modules/TextBookPage/actions';
import {
  SET_USER,
  SET_AUTH,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
} from './actionConsts';

export const setUser = (payload: User) => ({
  type: SET_USER,
  payload,
});

export const setAuth = (payload: Auth) => ({
  type: SET_AUTH,
  payload,
});

export const setAuthError = (payload: boolean) => ({
  type: SET_AUTH_ERROR,
  payload,
});

export const setAuthLoading = (payload: boolean) => ({
  type: SET_AUTH_LOADING,
  payload,
});

export const logInUser = (
  email: string,
  password: string
): ThunkAction<void, Auth, unknown, Action<string>> => async (dispatch) => {
  dispatch(setAuthLoading(true));
  database.loginUser({ email, password }).then(
    (user) => {
      dispatch(setAuth(user));
      dispatch(setAuthLoading(false));
    },
    () => {
      dispatch(setAuthLoading(false));
      dispatch(setAuthError(true));
    }
  );
};

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

  dispatch(setPage(0));
  dispatch(setGroup(0));

  dispatch(setUser(user));
  dispatch(setAuth(auth));
  dispatch(setAuthLoading(false));
  dispatch(setAuthError(false));
  LocStore.deleteUser();
};

export const loadUserInfoById = (
  id: string
): ThunkAction<void, StateMainPage, unknown, Action<string>> => (dispatch) => {
  dispatch(setAuthLoading(true));
  database.getUserById(id).then(
    (user: User) => {
      if (user) {
        dispatch(setUser(user));
      }
      dispatch(setAuthLoading(false));
    },
    () => {
      dispatch(setAuthError(true));
      dispatch(setAuthLoading(false));
    }
  );
};
