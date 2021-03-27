import React, { FC, useEffect } from 'react';
import { setPageTitle } from 'store/commonState/actions';
import { Container, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('DictionaryPage'));
  }, [dispatch]);

  return (
    <Container>
      <Paper>Dictionary</Paper>
    </Container>
  );
};