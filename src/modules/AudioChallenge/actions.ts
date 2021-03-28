import { ThunkAction } from 'redux-thunk';
import { ErrorType, StateTextBook } from 'types';
import { Action } from 'redux';
import { database } from 'services';
import { SET_AUDIO_WORDS, SET_AUDIO_ERROR } from './actionConsts';

export const setAudioWords = (payload: number) => ({
  type: SET_AUDIO_WORDS,
  payload,
});

export const setAudioError = (payload: ErrorType) => ({
  type: SET_AUDIO_ERROR,
  payload,
});

export const clearAudioError = () => ({
  type: SET_AUDIO_ERROR,
  payload: null,
});

// THUNKS
export const loadAudioGameWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20,
  filter: string = ''
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database.getUserAggregatedWord(userId, group, page, wordPerPage, filter).then(
    (words) => {
      dispatch(setAudioWords(words[0].paginatedResults));
      dispatch(clearAudioError());
    },
    (err) => {
      dispatch(setAudioError(err));
    }
  );
};
