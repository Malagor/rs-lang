import React, { FC, useEffect } from 'react';

import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { gamesData } from 'appConstants/games';
import { setPageTitle } from 'store/commonState/actions';
import { ErrorMessage } from 'components';
import { selectUserId } from 'modules/Login/selectors';
import { LocStore } from 'services';
import { updateStatisticsLearnedWords } from './actions';
import {
  selectLearnedWords,
  selectLearnedWordsByDays,
  selectStatisticsError,
} from './selectors';
import { AllTimeBlock, TodayBlock } from './components';
import { useStyles } from './styled';

const initialGameStatistics = {
  accuracy: 0,
  words: 0,
  inRow: 0,
};

const gamesStats: { [name: string]: typeof initialGameStatistics } = {};
gamesData.forEach((game) => {
  gamesStats[game.name] = { ...initialGameStatistics };
});

export const StatisticsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const learnedWordsByDays = useSelector(selectLearnedWordsByDays);
  const error = useSelector(selectStatisticsError);
  const userId = useSelector(selectUserId);
  const statisticsLearnedWords = useSelector(selectLearnedWords);
  const gamesStatistics = userId
    ? gamesStats
    : LocStore.getGamesStatistics()?.[new Date().toDateString()] || {};

  const totalAccuracy = Math.round(
    gamesData
      .map(({ name }) => gamesStatistics?.[name]?.accuracy || 0)
      .reduce((a, b) => a + b, 0) / gamesData.length
  );

  const learnedWords = userId
    ? statisticsLearnedWords
    : gamesData
        .map(({ name }) => gamesStatistics?.[name]?.wordsStudied || 0)
        .reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(updateStatisticsLearnedWords(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {error && <ErrorMessage />}
      {!error && (
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2 className={classes.title}>Today</h2>
            <TodayBlock
              learnedWords={learnedWords}
              accuracy={totalAccuracy}
              gamesStatistics={gamesStatistics}
            />
            {userId && (
              <>
                <h2 className={classes.title}>All time</h2>
                <AllTimeBlock learnedWordsByDays={learnedWordsByDays} />
              </>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};
