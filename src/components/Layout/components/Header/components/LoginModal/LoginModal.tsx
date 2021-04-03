import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'types';

import {
  Avatar,
  Button,
  Dialog,
  Typography,
  Container,
  CssBaseline,
} from '@material-ui/core';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { database, LocStore } from 'services';
import { setAuth, loadUserInfoById } from 'modules/Login/actions';
import { Form } from './components';
import { useStyles } from './styled';

type InputsData = {
  name?: string;
  email: string;
  password: string;
};

export const LoginModal: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForm = async (data: InputsData) => {
    const { name, email, password } = data;

    try {
      if (!isLogin && name) {
        // need registration
        await database.createUser({
          id: '',
          name,
          email,
          password,
          avatar: 'https://www.1zoom.ru/prev2/290/289595.jpg',
        });
      }

      const userAuth: Auth = await database.loginUser({
        email,
        password,
      });

      if (userAuth && userAuth.userId) {
        dispatch(setAuth(userAuth));
        database.setToken(userAuth.token);
        LocStore.setUser(JSON.stringify(userAuth));

        dispatch(loadUserInfoById(userAuth.userId));
      }
    } catch (err) {
      setErrorMessage('Failed to connect');
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.openModalButton}
      >
        <LockOpenIcon />
        Login
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'Login' : 'Registration'}
            </Typography>

            <Form
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleSubmitForm={handleSubmitForm}
              errorMessage={errorMessage}
            />
          </div>
        </Container>
      </Dialog>
    </div>
  );
};
