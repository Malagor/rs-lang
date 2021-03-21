import { StateMainPage, User } from 'types';
import { SET_USER } from 'appConstants';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const setUser = (payload: User) => ({
  type: SET_USER,
  payload,
});

export const loadUserInfo = (
  id: string
): ThunkAction<void, StateMainPage, unknown, Action<string>> => async (
  dispatch
) => {
  database
    .getUserInfo(id)
    .then((user) => {
      dispatch(setUser(user));
    })
    .catch((err) => {
      throw new Error(`Can not read UserInfo. ${err}`);
    });
};
