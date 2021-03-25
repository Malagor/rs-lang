import { State } from 'types';

export const selectUser = (state: State) => state.loginReducer.user;

export const selectToken = (state: State) => state.loginReducer.auth.token;

export const selectAuth = (state: State) => state.loginReducer.auth;
