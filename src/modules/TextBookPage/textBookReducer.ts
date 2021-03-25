import { Reducer } from 'redux';
import { StateTextBook } from 'types';
import { SET_GROUP, SET_PAGE, SET_SOUND, SET_WORDS } from './actionConst';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const textBookPageState: StateTextBook = {
  group: 0,
  page: 0,
  words: [],
  sounds: [],
};

export const textBookReducer: Reducer<StateTextBook, Action> = (
  state = textBookPageState,
  action
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

    default:
      return state;
  }
};
