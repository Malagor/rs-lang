import React, { FC, useEffect } from 'react';
import { setPageTitle } from 'store/commonState/actions';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, NavGame, RedirectionModal } from 'components';
import { selectAuthLoadingStatus, selectUserId } from 'modules/Login/selectors';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isUserLoaded = useSelector(selectAuthLoadingStatus);

  useEffect(() => {
    dispatch(setPageTitle('DictionaryPage'));
  }, [dispatch]);

  if (!userId && !isUserLoaded) return <RedirectionModal />;
  if (!userId && isUserLoaded) return <Loader />;

  return (
    <Container>
      <NavGame />
      <Paper>Dictionary</Paper>
    </Container>
  );
};
