import { Reducer } from 'redux';
import { StateTextBook } from 'types';
import {
  SET_ERROR,
  SET_GROUP,
  SET_PAGE,
  SET_SOUND,
  SET_WORDS,
  SET_PLAYED_SOUND,
  SET_CHECKED_DIFFICULTY,
  SET_PAGES_COUNT,
  SET_WORD_SECTION,
  SET_IS_LOADING,
} from './actionConst';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const textBookPageState: StateTextBook = {
  group: 0,
  page: 0,
  words: [],
  sounds: [],
  error: null,
  playedSound: '',
  checkedDifficulty: 'easy',
  pagesCount: 0,
  wordSection: 'usual',
  isLoading: false,
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

    case SET_CHECKED_DIFFICULTY:
      return {
        ...state,
        checkedDifficulty: action.payload,
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

    default:
      return state;
  }
};
