import { Reducer } from 'redux';
import { StateStatistics } from 'types';
import { SET_USER_STATISTICS, SET_STATISTICS_ERROR } from './actionConst';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const InitialStatistics = {
  learnedWords: 0,
  optional: {
    learnedWordsByDays: {},
  },
};

export const statisticsPageState: StateStatistics = {
  ...InitialStatistics,
  error: null,
};

export const statisticsReducer: Reducer<StateStatistics, Action> = (
  state = statisticsPageState,
  action: Action
) => {
  switch (action.type) {
    case SET_USER_STATISTICS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_STATISTICS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
