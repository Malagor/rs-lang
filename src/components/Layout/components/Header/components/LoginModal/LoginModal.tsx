import React, { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'types';

import {
  Avatar,
  Button,
  Dialog,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
} from '@material-ui/core';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { database, LocStore } from 'services';
import { setUser, setAuth } from 'modules/Login/actions';
import { useStyles } from './styled';

export const LoginModal: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isLogin) {
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

    if (userAuth.userId) {
      dispatch(setAuth(userAuth));
      database.setToken(userAuth.token);
      LocStore.setUser(JSON.stringify(userAuth));

      const userById = await database.getUserById(userAuth.userId);
      dispatch(setUser(userById));
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
            <form className={classes.form} noValidate>
              {!isLogin && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : 'Do you have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
};
