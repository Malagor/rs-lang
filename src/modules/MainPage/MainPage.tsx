import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, User } from 'types';
import { Container, Paper } from '@material-ui/core';
import { setUser } from './actions';
import { setPageTitle } from '../../store/commonState/actions';

type MainPageProps = {};

export const MainPage: FC<MainPageProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.mainPageReducer.user.name);
  const [value, setValue] = useState('');
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const setNewUser = () => {
    const userData: User = {
      message: '',
      name: value,
      refreshToken: '',
      token: '',
      userId: '',
    };
    dispatch(setUser(userData));
  };

  useEffect(() => {
    dispatch(setPageTitle('RS-Lang. Team-53'));
  }, [dispatch]);

  return (
    <Container>
      <Paper>
        User: {user}
        <input type="text" onChange={onChangeHandler} value={value} />
        <button type="button" onClick={setNewUser}>
          Поменять пользователя
        </button>
      </Paper>
    </Container>
  );
};
