import React, { FC, useEffect } from 'react';

import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { gamesData } from 'appConstants/games';
import { setPageTitle } from 'store/commonState/actions';
import { ErrorMessage } from 'components';
import { selectUserId } from 'modules/Login/selectors';
import { updateStatisticsLearnedWords } from './actions';
import { selectLearnedWordsByDays, selectStatisticsError } from './selectors';
import { AllTimeBlock, TodayBlock } from './components';
import { useStyles } from './styled';

const accuracy = 66;
const initialGameStatistics = {
  accuracy: 0,
  words: 0,
  inRow: 0,
};

const gamesStatistics: { [name: string]: typeof initialGameStatistics } = {};
gamesData.forEach((game) => {
  gamesStatistics[game.name] = { ...initialGameStatistics };
});

export const StatisticsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const learnedWordsByDays = useSelector(selectLearnedWordsByDays);
  const error = useSelector(selectStatisticsError);
  const userId = useSelector(selectUserId);

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
            <TodayBlock accuracy={accuracy} gamesStatistics={gamesStatistics} />
            <h2 className={classes.title}>All time</h2>
            <AllTimeBlock learnedWordsByDays={learnedWordsByDays} />
          </div>
        </div>
      )}
    </Container>
  );
};
