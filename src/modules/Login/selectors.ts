import { State } from 'types';

export const selectUser = (state: State) => state.loginReducer.user;

export const selectUserId = (state: State) => state.loginReducer.user.id;

export const selectToken = (state: State) => state.loginReducer.auth.token;

export const selectAuth = (state: State) => state.loginReducer.auth;
