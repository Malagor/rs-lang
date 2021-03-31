import React, { FC, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { ErrorMessage } from 'components';
import { gamesData } from 'appConstants/games';
import { selectUser } from 'modules/Login/selectors';
import { selectLearnedWordsByDays, selectStatisticsError } from './selectors';
import { TodayBlock } from './components/TodayBlock';
import { loadUserStatistics } from './actions';
import { useStyles } from './styled';
import { AllTimeBlock } from './components/AllTimeBlock';

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
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserStatistics(user.id));
    }
  }, [dispatch, user]);

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
