import { CreateUserWordType, DifficultyType, StateTextBook, Word, ErrorType } from 'types';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  SET_PAGE,
  SET_WORDS,
  SET_GROUP,
  SET_SOUND,
  UPDATE_WORDS,
  SET_ERROR
} from './actionConst';

export const setPage = (payload: number) => ({
  type: SET_PAGE,
  payload,
});

export const setGroup = (payload: number) => ({
  type: SET_GROUP,
  payload,
});

export const setSound = (payload: HTMLAudioElement[]) => ({
  type: SET_SOUND,
  payload,
});

export const setWords = (payload: Word[]) => ({
  type: SET_WORDS,
  payload,
});

export const setError = (payload: ErrorType) => ({
  type: SET_ERROR,
  payload,
});

export const clearError = () => ({
  type: SET_ERROR,
  payload: null,
});

export const updateWords = (payload: Word) => ({
  type: UPDATE_WORDS,
  payload,
});

export const addWordToUserList = async (
  userId: string,
  wordId: string,
  type: DifficultyType
) => {
  const options: CreateUserWordType = {
    userId,
    wordId,
    wordOptions: {
      difficulty: type,
    },
  };
  return database.createUserWord(options);
};

export const updateWordInUserList = async (
  userId: string,
  wordId: string,
  type: DifficultyType
) => {
  const options: CreateUserWordType = {
    userId,
    wordId,
    wordOptions: {
      difficulty: type,
    },
  };
  return database.updateUserWord(options);
};

export const removeWordFromUserList = async (
  userId: string,
  wordId: string
) => {
  await database.deleteUserWord({ userId, wordId });
};

export const loadWords = (
  group: number = 0,
  page: number = 0
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) =>
  database.getWords(group, page).then(
    (words) => {
      dispatch(setWords(words));
      dispatch(clearError());
    },
    (err) => {
      dispatch(setError(err));
    }
  );

// THUNKS
export const loadUserAggregateWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database
    .getUserAggregatedWord(userId, group, page, wordPerPage)
    .then((words) => {
      dispatch(setWords(words[0].paginatedResults));
    });
};

export const loadUserDifficultWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database
    .getUserAggregatedWord(
      userId,
      group,
      page,
      wordPerPage,
      '{"userWord.difficulty":"hard"}'
    )
    .then((words) => {
      dispatch(setWords(words[0].paginatedResults));
    });
};

export const loadUserDeletedWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  database
    .getUserAggregatedWord(
      userId,
      group,
      page,
      wordPerPage,
      '{"userWord.difficulty":"easy"}'
    )
    .then((words) => {
      dispatch(setWords(words[0].paginatedResults));
    });
};
