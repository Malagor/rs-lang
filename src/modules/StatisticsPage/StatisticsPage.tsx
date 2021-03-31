import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { setPageTitle } from 'store/commonState/actions';
import { RedirectionModal } from 'components';

type GamesProps = {};

export const StatisticsPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Statistics'));
  }, [dispatch]);

  const userId = useSelector(selectUserId);

  return (
    <Container>
      {userId ? <Paper>Statistic</Paper> : <RedirectionModal />}
    </Container>
  );
};
