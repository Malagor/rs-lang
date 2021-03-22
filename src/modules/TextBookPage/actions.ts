import { StateTextBook, Word } from 'types';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_PAGE, SET_WORDS, SET_GROUP } from './actionConst';

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
  database
    .getWords(group, page)
    .then((words) => {
      dispatch(setWords(words));
    })
    .catch((err) => {
      throw new Error(`Can not read Words. ${err}`);
    });
};
