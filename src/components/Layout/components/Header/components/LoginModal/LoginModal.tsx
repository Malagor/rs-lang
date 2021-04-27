import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'types';
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
import {
  selectLoginModalOpen,
  selectRegistrationModalOpen,
} from 'store/commonState/selectors';
import {
  setLoginModalOpen,
  setRegistrationModalOpen,
} from 'store/commonState/actions';
import { setAuth, loadUserInfoById } from 'modules/Login/actions';
import { Form } from './components';
import { useStyles } from './styled';

type SubmitFormData = {
  name?: string;
  email: string;
  password: string;
  avatar: string;
};

export const LoginModal: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isLoginModalOpen = useSelector(selectLoginModalOpen);
  const isRegistrationModalOpen = useSelector(selectRegistrationModalOpen);
  const open = isLoginModalOpen || isRegistrationModalOpen;

  const [loadingImg, setLoadingImg] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const setLogin = (value: boolean) => {
    dispatch(setLoginModalOpen(value));
    dispatch(setRegistrationModalOpen(!value));
  };

  const handleClickOpen = () => {
    dispatch(setRegistrationModalOpen(false));
    dispatch(setLoginModalOpen(true));
  };
  const handleClose = () => {
    dispatch(setLoginModalOpen(false));
    dispatch(setRegistrationModalOpen(false));
  };

  const handleSubmitForm = async (data: SubmitFormData) => {
    const { name, email, password } = data;

    try {
      if (isRegistrationModalOpen && name) {
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

    setLoadingImg(true);
    try {
      const res = await fetch(API_CLOUDINARY, {
        method: 'POST',
        body: data,
      });
      const file = await res.json();

      setImageURL(file.secure_url);
      setLoadingImg(false);
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
              {isLoginModalOpen ? 'Login' : 'Registration'}
            </Typography>

            <Form
              isLogin={isLoginModalOpen || !isRegistrationModalOpen}
              setLogin={setLogin}
              handleSubmitForm={handleSubmitForm}
              errorMessage={errorMessage}
              isLoadingImg={loadingImg}
              imageURL={imageURL}
              uploadImg={uploadImg}
            />
          </div>
        </Container>
      </Dialog>
    </div>
  );
};
