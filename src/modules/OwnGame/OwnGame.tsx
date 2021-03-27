import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';

type GamesProps = {};

export const OwnGame: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Own game'));
  }, [dispatch]);

  return (
    <Container>
      <Paper>Own game</Paper>
    </Container>
  );
};
