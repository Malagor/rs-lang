import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'modules/Login/selectors';
import { setPageTitle } from 'store/commonState/actions';
import { RedirectionModal } from 'components';

type GamesProps = {};

export const StatisticsPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  const user = useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  const authUser = useSelector(selectAuth);

  return (
    <Container>
      {authUser.userId ? <Paper>Statistic</Paper> : <RedirectionModal />}
    </Container>
  );
};
