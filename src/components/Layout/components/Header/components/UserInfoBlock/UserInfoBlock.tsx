import React, { FC } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';

type UserInfoBlockProps = {};

export const useStyles = makeStyles(() => ({
  marginLeft: {
    marginLeft: 10,
  },
}));

export const UserInfoBlock: FC<UserInfoBlockProps> = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <>
      <Typography className={classes.marginLeft}>{user.name}</Typography>
      <Avatar
        alt={user.name}
        src={user.avatar}
        className={classes.marginLeft}
      />
    </>
  );
};
