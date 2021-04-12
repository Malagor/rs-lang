import {
  CreateUserWordType,
  DifficultyType,
  StateTextBook,
  Word,
  ErrorType,
  WordSectionType,
} from 'types';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getCountWords } from 'helpers/dictionaryHelpers';
import { getNonDeletedWords } from 'helpers/getNonDeletedWords';
import {
  SET_PAGE,
  SET_WORDS,
  SET_GROUP,
  SET_SOUND,
  UPDATE_WORDS,
  SET_ERROR,
  SET_PLAYED_SOUND,
  SET_CHECKED_DIFFICULTY,
  SET_PAGES_COUNT,
  SET_WORD_SECTION,
  SET_IS_LOADING,
  SET_REF_STATISTIC,
  ADD_GAME_WORDS,
  SET_GAME_WORDS,
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

export const setGameWords = (payload: Word[]) => ({
  type: SET_GAME_WORDS,
  payload,
});

export const addGameWords = (payload: Word[]) => ({
  type: ADD_GAME_WORDS,
  payload,
});

export const setWordsError = (payload: ErrorType) => ({
  type: SET_ERROR,
  payload,
});

export const clearWordsError = () => ({
  type: SET_ERROR,
  payload: null,
});

export const updateWords = (payload: Word) => ({
  type: UPDATE_WORDS,
  payload,
});

export const setPlayedSound = (payload: string) => ({
  type: SET_PLAYED_SOUND,
  payload,
});

export const setCheckedDifficulty = (payload: string) => ({
  type: SET_CHECKED_DIFFICULTY,
  payload,
});

export const setPagesCount = (payload: number) => ({
  type: SET_PAGES_COUNT,
  payload,
});

export const setWordSection = (payload: WordSectionType) => ({
  type: SET_WORD_SECTION,
  payload,
});

export const setIsLoading = (payload: boolean) => ({
  type: SET_IS_LOADING,
  payload,
});

export const setRefStatistic = (payload: HTMLButtonElement) => ({
  type: SET_REF_STATISTIC,
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
  const word = await database.getUserWord(userId, wordId);
  const wordOptions = word?.optional || {};
  const options: CreateUserWordType = {
    userId,
    wordId,
    wordOptions: {
      ...wordOptions,
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

// THUNKS
export const loadWords = (
  group: number = 0,
  page: number = 0
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  database.getWords(group, page).then(
    (words) => {
      dispatch(setWords(words));
      dispatch(clearWordsError());
      dispatch(setIsLoading(false));
    },
    (err) => {
      dispatch(setWordsError(err));
      dispatch(setIsLoading(false));
    }
  );
};

export const loadUserAggregateWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  // database.getUserAggregatedWord(userId, group, page, wordPerPage).then(
  database.getUserAggregatedWord({ userId, group, page, wordPerPage }).then(
    (words) => {
      dispatch(setWords(words[0].paginatedResults));
      dispatch(setPagesCount(getCountWords(words[0].totalCount)));
      dispatch(clearWordsError());
      dispatch(setIsLoading(false));
    },
    (err) => {
      dispatch(setWordsError(err));
      dispatch(setIsLoading(false));
    }
  );
};

export const loadUserDifficultWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  database
    .getUserAggregatedWord({
      userId,
      group,
      page,
      wordPerPage,
      filter: '{"userWord.difficulty":"hard"}',
    })
    .then(
      (words) => {
        dispatch(setWords(words[0].paginatedResults));
        dispatch(setPagesCount(getCountWords(words[0].totalCount)));
        dispatch(clearWordsError());
        dispatch(setIsLoading(false));
      },
      (err) => {
        dispatch(setWordsError(err));
        dispatch(setIsLoading(false));
      }
    );
};

export const loadUserDeletedWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  database
    .getUserAggregatedWord({
      userId,
      group,
      page,
      wordPerPage,
      filter: '{"userWord.difficulty":"easy"}',
    })
    .then(
      (words) => {
        dispatch(setWords(words[0].paginatedResults));
        dispatch(setPagesCount(getCountWords(words[0].totalCount)));
        dispatch(clearWordsError());
        dispatch(setIsLoading(false));
      },
      (err) => {
        dispatch(setWordsError(err));
        dispatch(setIsLoading(false));
      }
    );
};

export const loadAdditionalGameWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20
): ThunkAction<
  Promise<unknown>,
  StateTextBook,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoading(true));
  database
    .getUserAggregatedWord({
      userId,
      group,
      page,
      wordPerPage,
    })
    .then(
      (res) => {
        const additionalWords: Word[] = getNonDeletedWords(
          res[0].paginatedResults
        );
        dispatch(addGameWords(additionalWords));
        dispatch(setIsLoading(false));
      },
      (err) => {
        dispatch(setWordsError(err));
      }
    );
};
