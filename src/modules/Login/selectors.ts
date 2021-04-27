import { State } from 'types';

export const selectUser = (state: State) => state.loginReducer.user;

export const selectUserId = (state: State) => state.loginReducer.user.id;

export const selectToken = (state: State) => state.loginReducer.auth.token;

export const selectAuth = (state: State) => state.loginReducer.auth;

export const selectAuthErrorStatus = (state: State) => state.loginReducer.error;

export const selectAuthLoadingStatus = (state: State) =>
  state.loginReducer.loading;
