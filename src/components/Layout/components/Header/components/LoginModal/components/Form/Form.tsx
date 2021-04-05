import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { MIN_PASSWORD_LENGTH } from 'appConstants/index';
import { InputsForm } from 'types';

import {
  Checkbox,
  Link,
  Grid,
  FormControlLabel,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { FileInput } from './components';
import { useStyles } from './styled';

type FormProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: Function;
  errorMessage: string;

  uploadImg: Function;
  imageURL: string;
  isLoadingImg: boolean;
};

export const Form: FC<FormProps> = ({
  isLogin,
  setIsLogin,
  handleSubmitForm,
  errorMessage,
  uploadImg,
  imageURL,
  isLoadingImg,
}) => {
  let rulesNameValidation = yup.string();

  const createRulesNameValidation = () => {
    if (!isLogin) {
      rulesNameValidation = yup.string().required('Name is required field');
    }
  };
  createRulesNameValidation();

  const schema = yup.object().shape({
    name: rulesNameValidation,
    email: yup
      .string()
      .email('Email should have correct format')
      .required('Email is required field'),
    password: yup
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password is too short - should be ${MIN_PASSWORD_LENGTH} chars minimum.`
      )
      .required('No password provided.'),
  });

  const { register, handleSubmit, watch, errors } = useForm<InputsForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const showPassword = watch('showPassword');

  const onSubmit = (data: object) => {
    handleSubmitForm(data);
  };

  const classes = useStyles();

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      {!isLogin && (
        <TextField
          inputRef={register}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
      )}
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus={isLogin}
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors?.password?.message}
      />

      <FormControlLabel
        control={
          <Checkbox name="showPassword" inputRef={register} color="primary" />
        }
        label="Show password"
      />

      {!isLogin && (
        <FileInput
          isLoadingImg={isLoadingImg}
          imageURL={imageURL}
          uploadImg={uploadImg}
        />
      )}

      <Typography color="error" variant="subtitle2">
        {errorMessage}
      </Typography>

      <Button
        disabled={isLoadingImg}
        className={classes.button}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Button>

      <Grid container className={classes.link}>
        <Grid item>
          <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Do you have an account? Sign In'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
