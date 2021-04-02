import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Paper } from '@material-ui/core';
import { setPageTitle } from 'store/commonState/actions';
import { Countdown } from 'components';

type MainPageProps = {};

export const MainPage: FC<MainPageProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('RS-Lang. Team-53'));
  }, [dispatch]);

  return (
    <Container>
      <Paper
        style={{
          height: '80vh',
          background: 'linear-gradient(180deg, #185A9D 0%, #43CEA2 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Countdown duration={60} />
      </Paper>
    </Container>
  );
};
