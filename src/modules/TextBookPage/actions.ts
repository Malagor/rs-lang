import { StateTextBook, Word } from 'types';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_PAGE, SET_WORDS, SET_GROUP, SET_SOUND } from './actionConst';

export const setPage = (payload: number) => ({
  type: SET_PAGE,
  payload,
});

export const setGroup = (payload: number) => ({
  type: SET_GROUP,
  payload,
});

export const setWords = (payload: Word[]) => ({
  type: SET_WORDS,
  payload,
});

export const loadWords = (
  group: number = 0,
  page: number = 0
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database.getWords(group, page).then((words) => {
    dispatch(setWords(words));
  });
};

export const loadUserAggregateWords = (
  userId: string,
  group: number = 0,
  page: number = 0
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database.getUserAggregatedWord(userId, group, page).then((words) => {
    dispatch(setWords(words[0].paginatedResults));
  });
};

export const setSound = (payload: HTMLAudioElement[]) => ({
  type: SET_SOUND,
  payload,
});
