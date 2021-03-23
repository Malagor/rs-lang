import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/commonState/actions';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  return (
    <Container>
      <Paper>Games</Paper>
    </Container>
  );
};
