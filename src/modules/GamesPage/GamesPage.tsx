import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { selectUserId } from '../Login/selectors';
import { RedirectionModal } from '../../components/RedirectionModal';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  if (!userId) return <RedirectionModal />;

  return (
    <Container>
      <Paper>Games</Paper>
    </Container>
  );
};
