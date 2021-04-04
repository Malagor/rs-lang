import { State } from 'types';

export const selectStatisticsError = (state: State) =>
  state.statisticsReducer.error;

export const selectLearnedWordsByDays = (state: State) =>
  state.statisticsReducer.optional.learnedWordsByDays;

export const selectLearnedWords = (state: State) =>
  state.statisticsReducer.learnedWords;
