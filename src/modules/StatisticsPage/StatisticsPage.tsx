import React, { FC, useEffect } from 'react';

import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { ErrorMessage, RedirectionModal } from 'components';
import { selectUserId } from 'modules/Login/selectors';
import { updateStatisticsLearnedWords } from './actions';
import {
  selectLearnedWordsByDays,
  selectGamesStatistics,
  selectStatisticsError,
} from './selectors';
import { AllTimeBlock, TodayBlock } from './components';
import { useStyles } from './styled';

export const StatisticsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const learnedWordsByDays = useSelector(selectLearnedWordsByDays);
  const gamesStatistics = useSelector(selectGamesStatistics);
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

  if (!userId) return <RedirectionModal />;

  return (
    <Container>
      {error && <ErrorMessage />}
      {!error && (
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2 className={classes.title}>Today</h2>
            <TodayBlock gamesStatistics={gamesStatistics} />
            <h2 className={classes.title}>All time</h2>
            <AllTimeBlock learnedWordsByDays={learnedWordsByDays} />
          </div>
        </div>
      )}
    </Container>
  );
};
