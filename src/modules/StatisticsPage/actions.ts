import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { database } from 'services';
import { ErrorType, StateStatistics } from 'types';
import { SET_USER_STATISTICS, SET_STATISTICS_ERROR } from './actionConst';

export const setUserStatistics = (payload: StateStatistics) => ({
  type: SET_USER_STATISTICS,
  payload,
});

export const setStatisticsError = (payload: ErrorType) => ({
  type: SET_STATISTICS_ERROR,
  payload,
});

export const clearStatisticsError = () => ({
  type: SET_STATISTICS_ERROR,
  payload: null,
});

export const updateStatisticsLearnedWords = (
  userId: string,
  addLearnedWord?: boolean
): ThunkAction<void, StateStatistics, unknown, Action<string>> => async (
  dispatch
) => {
  let statistics;
  try {
    statistics = await database.getUserStatistics(userId);
  } catch (err) {
    dispatch(setStatisticsError(err));
    return;
  }

  const learnedWordsByDays = statistics?.optional?.learnedWordsByDays;
  const date = new Date().toDateString();
  const missedDates: { [date: string]: number } = {};
  let todayLearnedWords = learnedWordsByDays?.[date] || 0;

  if (addLearnedWord) {
    todayLearnedWords += 1;
  }

  if (learnedWordsByDays) {
    const dates = Object.keys(learnedWordsByDays);
    const lastDate = dates[dates.length - 1];
    const timeDiff = new Date(date).getTime() - new Date(lastDate).getTime();
    const diffInDays = timeDiff / (1000 * 3600 * 24);
    if (diffInDays > 1) {
      for (let i = 1; i < diffInDays; i += 1) {
        const missedDate = new Date(lastDate);
        missedDate.setDate(missedDate.getDate() + i);
        missedDates[missedDate.toDateString()] = 0;
      }
    }
  }

  const newStatistics = {
    learnedWords: todayLearnedWords,
    optional: {
      ...statistics?.optional,
      learnedWordsByDays: {
        ...learnedWordsByDays,
        ...missedDates,
        [date]: todayLearnedWords,
      },
    },
  };

  database.updateUserStatistics(userId, newStatistics).then(
    (data) => {
      dispatch(setUserStatistics(data));
    },
    (err) => {
      dispatch(setStatisticsError(err));
    }
  );
};
