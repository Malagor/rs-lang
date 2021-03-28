import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';

type AudioChallengeProps = {};

export const AudioChallenge: FC<AudioChallengeProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Audio challenge'));
  }, [dispatch]);

  return (
    <Container>
      <Paper>Audio challenge</Paper>
    </Container>
  );
};
