import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { TodayBlock } from './components/TodayBlock';

type StatisticsProps = {};

export const StatisticsPage: FC<StatisticsProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  return (
    <Container>
      <TodayBlock />
      <Paper>All time</Paper>
    </Container>
  );
};
