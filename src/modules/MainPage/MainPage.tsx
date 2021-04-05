import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { setPageTitle } from 'store/commonState/actions';
import { Loader } from 'components';

type MainPageProps = {};

export const MainPage: FC<MainPageProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('RS-Lang. Team-53'));
  }, [dispatch]);

  return (
    <Container>
      <Loader fixed />
    </Container>
  );
};
