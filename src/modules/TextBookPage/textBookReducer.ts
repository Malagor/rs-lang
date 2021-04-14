import { EASY_DIFFICULTY, LEARNING_SECTION, WordsSource } from 'appConstants';
import { Reducer } from 'redux';
import { StateTextBook } from 'types';
import {
  SET_ERROR,
  SET_GROUP,
  SET_PAGE,
  SET_SOUND,
  SET_WORDS,
  SET_PLAYED_SOUND,
  SET_CHECKED_DIFFICULTIES,
  SET_PAGES_COUNT,
  SET_WORD_SECTION,
  SET_IS_LOADING,
  SET_REF_STATISTIC,
  ADD_GAME_WORDS,
  SET_GAME_WORDS,
  SET_GAME_WORDS_KIND,
} from './actionConst';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const textBookPageState: StateTextBook = {
  group: 0,
  page: 0,
  words: [],
  gameWords: [],
  gameWordsKind: WordsSource.FROM_MENU,
  sounds: [],
  error: null,
  playedSound: '',
  checkedDifficulties: [EASY_DIFFICULTY],
  pagesCount: 0,
  wordSection: LEARNING_SECTION,
  isLoading: false,
  refStatistic: null,
};

export const textBookReducer: Reducer<StateTextBook, Action> = (
  state = textBookPageState,
  action: Action
) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case SET_GAME_WORDS:
      return {
        ...state,
        gameWords: action.payload,
      };
    case SET_GAME_WORDS_KIND:
      return {
        ...state,
        gameWordsKind: action.payload,
      };
    case ADD_GAME_WORDS:
      return {
        ...state,
        gameWords: [...state.gameWords, ...action.payload],
      };
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case SET_SOUND: {
      return {
        ...state,
        sounds: action.payload,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case SET_PLAYED_SOUND:
      return {
        ...state,
        playedSound: action.payload,
      };

    case SET_CHECKED_DIFFICULTIES:
      return {
        ...state,
        checkedDifficulties: action.payload.slice(),
      };

    case SET_PAGES_COUNT:
      return {
        ...state,
        pagesCount: Math.ceil(action.payload / 20) || 1,
      };

    case SET_WORD_SECTION:
      return {
        ...state,
        wordSection: action.payload,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_REF_STATISTIC:
      return {
        ...state,
        refStatistic: action.payload,
      };

    default:
      return state;
  }
};
