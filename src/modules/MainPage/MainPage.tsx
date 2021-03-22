import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, User } from 'types';
import { setUser } from './actions';

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

  return (
    <div>
      <h2>MainPage</h2>
      <h3>User: {user}</h3>
      <input type="text" onChange={onChangeHandler} value={value} />
      <button type="button" onClick={setNewUser}>
        Поменять пользователя
      </button>
    </div>
  );
};
