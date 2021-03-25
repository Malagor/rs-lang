import React, { FC } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';
import clsx from 'clsx';

type UserInfoBlockProps = {};

export const useStyles = makeStyles(() => ({
  marginLeft: {
    marginLeft: 10,
  },
  userInfoBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  userEmail: {
    fontSize: '14px',
    lineHeight: '16px',
  },
}));

export const UserInfoBlock: FC<UserInfoBlockProps> = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <>
      <div className={classes.userInfoBlock}>
        <Typography className={classes.marginLeft} align="right">
          {user.name}
        </Typography>
        <Typography
          className={clsx(classes.marginLeft, classes.userEmail)}
          align="right"
        >
          {user.email}
        </Typography>
      </div>
      <Avatar
        alt={user.name}
        src={user.avatar}
        className={classes.marginLeft}
      />
    </>
  );
};
