import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { database } from 'services';
import { ErrorType, StateStatistics, Word } from 'types';
import { SET_USER_STATISTICS, SET_ERROR } from './actionConst';

export const setUserStatistics = (payload: StateStatistics) => ({
  type: SET_USER_STATISTICS,
  payload,
});

export const setStatisticsError = (payload: ErrorType) => ({
  type: SET_ERROR,
  payload,
});

export const clearStatisticsError = () => ({
  type: SET_ERROR,
  payload: null,
});

export const loadUserStatistics = (
  userId: string
): ThunkAction<void, StateStatistics, unknown, Action<string>> => async (
  dispatch
) => {
  database.getUserStatistics(userId).then(
    (statistics) => {
      dispatch(setUserStatistics(statistics));
      dispatch(clearStatisticsError());
    },
    (err) => {
      dispatch(setStatisticsError(err));
    }
  );
};

export const updateStatisticsLearnedWords = (
  userId: string,
  addToToday?: number
): ThunkAction<void, StateStatistics, unknown, Action<string>> => async (
  dispatch
) => {
  let learnedWords;
  let statistics;

  try {
    const words = await database.getUserAggregatedWord(userId);
    learnedWords = words[0].paginatedResults.filter(
      (word: Word) => word?.userWord?.difficulty === 'easy'
    );
    statistics = await database.getUserStatistics(userId);
  } catch (err) {
    dispatch(setStatisticsError(err));
    return;
  }

  const learnedWordsByDays = statistics?.optional?.learnedWordsByDays;

  const date = new Date().toDateString();
  let todayLearnedWords = learnedWordsByDays[date] || 0;
  if (addToToday) {
    todayLearnedWords += addToToday;
  }

  const missedDays: { [date: string]: number } = {};

  if (learnedWordsByDays) {
    const dates = Object.keys(learnedWordsByDays);
    const lastDate = dates[dates.length - 1];
    const timeDiff = new Date(date).getTime() - new Date(lastDate).getTime();
    const diffInDays = timeDiff / (1000 * 3600 * 24);
    if (diffInDays > 1) {
      for (let i = 1; i < diffInDays; i += 1) {
        const tempDate = new Date(lastDate);
        tempDate.setDate(tempDate.getDate() + i);
        missedDays[tempDate.toDateString()] = 0;
      }
    }
  }

  const newStatistics = {
    ...statistics,
    learnedWords: learnedWords.length,
    optional: {
      ...statistics?.optional,
      learnedWordsByDays: {
        ...learnedWordsByDays,
        ...missedDays,
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
