import React, { FC, useEffect } from 'react';
import { setPageTitle } from 'store/commonState/actions';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { NavGame, RedirectionModal } from 'components';
import { selectUserId } from '../Login/selectors';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(setPageTitle('DictionaryPage'));
  }, [dispatch]);

  if (!userId) return <RedirectionModal />;

  return (
    <Container>
      <NavGame />
      <Paper>Dictionary</Paper>
    </Container>
  );
};
