import React from 'react';
import * as actions from './actions';
import { statisticsPageState, statisticsReducer } from './statisticsReducer';

const statistic = {
  learnedWords: 1,
  optional: {
    learnedWordsByDays: {
      'Test date 2021': 1,
    },
  },
  error: null,
};

const error = {
  message: 'testError',
};

describe('Statistic state tests', () => {
  test('The statistic of the user must be set', () => {
    const action = actions.setUserStatistics(statistic);
    const state = statisticsReducer(statisticsPageState, action);

    expect(state.learnedWords).toEqual(1);
    expect(state.error).toBeNull();
  });

  test('The error must be set', () => {
    const action = actions.setStatisticsError(error);
    const state = statisticsReducer(statisticsPageState, action);

    expect(state.error).not.toBeNull();
    expect(state.error?.message).toBe('testError');
  });

  test('The error must be reset', () => {
    const setErrorAction = actions.setStatisticsError(error);
    let state = statisticsReducer(statisticsPageState, setErrorAction);

    expect(state.error).not.toBeNull();
    expect(state.error?.message).toBe('testError');

    const clearErrorAction = actions.clearStatisticsError();
    state = statisticsReducer(statisticsPageState, clearErrorAction);

    expect(state.error).toBeNull();
  });
});
