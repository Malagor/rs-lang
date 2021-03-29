import { ThunkAction } from 'redux-thunk';
import { ErrorType, StateTextBook, Word } from 'types';
import { Action } from 'redux';
import { database } from 'services';
import {
  SET_AUDIO_WORDS,
  SET_AUDIO_ERROR,
  SET_AUDIO_CURRENT,
  SET_AUDIO_IS_ANSWER,
  SET_AUDIO_FINISH,
  SET_AUDIO_USER_ANSWER,
  SET_AUDIO_CHAIN,
  SET_AUDIO_CORRECT_WORDS,
  SET_AUDIO_INCORRECT_WORDS,
  SET_AUDIO_LONGER_CHAIN,
} from './actionConsts';

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

export const setCurrentWord = (payload: number) => ({
  type: SET_AUDIO_CURRENT,
  payload,
});

export const setIsAnswer = (payload: boolean) => ({
  type: SET_AUDIO_IS_ANSWER,
  payload,
});

export const setFinish = (payload: boolean) => ({
  type: SET_AUDIO_FINISH,
  payload,
});

export const setUserAnswer = (payload: string) => ({
  type: SET_AUDIO_USER_ANSWER,
  payload,
});

export const setChain = (payload: number) => ({
  type: SET_AUDIO_CHAIN,
  payload,
});

export const setLongerChain = (payload: number) => ({
  type: SET_AUDIO_LONGER_CHAIN,
  payload,
});

export const setCorrectWords = (payload: Word) => ({
  type: SET_AUDIO_CORRECT_WORDS,
  payload,
});

export const clearCorrectWords = () => ({
  type: SET_AUDIO_CORRECT_WORDS,
  payload: [],
});

export const clearIncorrectWords = () => ({
  type: SET_AUDIO_INCORRECT_WORDS,
  payload: [],
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
