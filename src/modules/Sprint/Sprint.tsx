import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { RedirectionModal } from '../../components/RedirectionModal';
import { selectUserId } from '../Login/selectors';

type GamesProps = {};

export const Sprint: FC<GamesProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(setPageTitle('Sprint'));
  }, [dispatch]);

  if (!userId) return <RedirectionModal />;

  return (
    <Container>
      <Paper>Sprint</Paper>
    </Container>
  );
};
