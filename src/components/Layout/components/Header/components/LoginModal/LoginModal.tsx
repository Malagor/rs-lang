import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth, InputsData } from 'types';
import { API_CLOUDINARY } from 'appConstants/index';

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

export const LoginModal: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [isLoadingImg, steIsLoadingImg] = useState(false);
  const [imageURL, setImageURL] = useState('');

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
          avatar: imageURL,
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

  const uploadImg = async (dataFile: File) => {
    const data = new FormData();
    data.append('file', dataFile);
    data.append('upload_preset', 'rsLangApp');
    console.log('go img');

    steIsLoadingImg(true);
    try {
      const res = await fetch(API_CLOUDINARY, {
        method: 'POST',
        body: data,
      });
      const file = await res.json();

      setImageURL(file.secure_url);
      steIsLoadingImg(false);
    } catch {
      setErrorMessage('Failed to upload image');
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
              isLoadingImg={isLoadingImg}
              imageURL={imageURL}
              uploadImg={uploadImg}
            />
          </div>
        </Container>
      </Dialog>
    </div>
  );
};
