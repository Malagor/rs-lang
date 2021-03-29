import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'modules/Login/selectors';
import { setPageTitle } from 'store/commonState/actions';
import { RedirectionModal } from 'components';

type GamesProps = {};

export const StatisticsPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  const authUserData = useSelector(selectAuth);

  return (
    <Container>
      {authUserData.userId ? <Paper>Statistic</Paper> : <RedirectionModal />}
    </Container>
  );
};
