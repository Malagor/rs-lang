import {
  CreateUserWordType,
  DifficultyType,
  StateTextBook,
  Word,
  ErrorType,
  WordSectionType,
  GameWordsKindType,
} from 'types';
import { database } from 'services';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  NORMAL_DIFFICULTY,
  DELETED_SECTION,
  DIFFICULT_SECTION,
  LEARNING_SECTION,
  PAGES_IN_EACH_GROUP,
  WORDS_ON_EACH_PAGE,
} from 'appConstants';
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
  SET_CHECKED_DIFFICULTIES,
  SET_PAGES_COUNT,
  SET_WORD_SECTION,
  SET_IS_LOADING,
  SET_STATISTIC_WORDS,
  SET_IS_TRANSLATION_SHOWN,
  SET_IS_BUTTONS_SHOWN,
  SET_DICTIONARY_PAGE,
  SET_DICTIONARY_GROUP,
  ADD_GAME_WORDS,
  SET_GAME_WORDS,
  SET_GAME_WORDS_KIND,
} from './actionConst';

export const setPage = (payload: number) => ({
  type: SET_PAGE,
  payload,
});

export const setGroup = (payload: number) => ({
  type: SET_GROUP,
  payload,
});

export const setDictionaryPage = (payload: number) => ({
  type: SET_DICTIONARY_PAGE,
  payload,
});

export const setDictionaryGroup = (payload: number) => ({
  type: SET_DICTIONARY_GROUP,
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

export const setGameWordsKind = (payload: GameWordsKindType) => ({
  type: SET_GAME_WORDS_KIND,
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

export const setCheckedDifficulties = (payload: DifficultyType[]) => ({
  type: SET_CHECKED_DIFFICULTIES,
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

export const setStatisticWords = (payload: Word[]) => ({
  type: SET_STATISTIC_WORDS,
  payload,
});

export const setIsTranslationShown = (payload: boolean) => ({
  type: SET_IS_TRANSLATION_SHOWN,
  payload,
});

export const setIsButtonsShown = (payload: boolean) => ({
  type: SET_IS_BUTTONS_SHOWN,
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
  const optional = word?.optional || {};
  const options: CreateUserWordType = {
    userId,
    wordId,
    wordOptions: {
      optional: { ...optional },
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
  wordPerPage: number = 20,
  filter: string = '',
  forStatistic: boolean = false
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  database
    .getUserAggregatedWord({ userId, group, page, wordPerPage, filter })
    .then(
      (words) => {
        forStatistic
          ? dispatch(setStatisticWords(words[0].paginatedResults))
          : dispatch(setWords(words[0].paginatedResults)) &&
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
  const filter = `{"userWord.difficulty":"${HARD_DIFFICULTY}"}`;
  dispatch(loadUserAggregateWords(userId, group, page, wordPerPage, filter));
};

export const loadUserLearningWords = (
  userId: string,
  group: number = 0,
  page: number = 0,
  wordPerPage: number = 20,
  forStatistic: boolean = false
): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
  dispatch
) => {
  const filter = `{"$or":[{"userWord.difficulty":"${NORMAL_DIFFICULTY}"},{"userWord.difficulty":"${HARD_DIFFICULTY}"}]}`;
  dispatch(
    loadUserAggregateWords(
      userId,
      group,
      page,
      wordPerPage,
      filter,
      forStatistic
    )
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
  const filter = `{"userWord.difficulty":"${EASY_DIFFICULTY}"}`;
  dispatch(loadUserAggregateWords(userId, group, page, wordPerPage, filter));
};

export const loadRandomGameWords = (
  group: number
): ThunkAction<
  Promise<unknown>,
  StateTextBook,
  unknown,
  Action<string>
> => async (dispatch) => {
  const page = Math.floor(Math.random() * PAGES_IN_EACH_GROUP);
  dispatch(setIsLoading(true));
  database.getWords(group, page).then(
    (words) => {
      dispatch(setGameWords(words));
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
  wordPerPage: number = WORDS_ON_EACH_PAGE,
  wordsFilter?: WordSectionType
): ThunkAction<
  Promise<unknown>,
  StateTextBook,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(setIsLoading(true));
  let filter = '';
  if (wordsFilter === LEARNING_SECTION) {
    filter = `{"$or":[{"userWord.difficulty":"${NORMAL_DIFFICULTY}"},{"userWord.difficulty":"${HARD_DIFFICULTY}"}]}`;
  } else if (wordsFilter === DIFFICULT_SECTION) {
    filter = `{"userWord.difficulty":"${HARD_DIFFICULTY}"}`;
  } else if (wordsFilter === DELETED_SECTION) {
    filter = `{"userWord.difficulty":"${EASY_DIFFICULTY}"}`;
  }
  database
    .getUserAggregatedWord({
      userId,
      group,
      page,
      wordPerPage,
      filter,
    })
    .then(
      (res) => {
        const additionalWords: Word[] =
          filter !== ''
            ? res[0].paginatedResults
            : getNonDeletedWords(res[0].paginatedResults);
        dispatch(addGameWords(additionalWords));
        dispatch(clearWordsError());
        dispatch(setIsLoading(false));
      },
      (err) => {
        dispatch(setWordsError(err));
        dispatch(setIsLoading(false));
      }
    );
};
