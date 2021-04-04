import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { selectPageTitle } from 'store/commonState/selectors';
import { useStyles } from './styled';

type PageTitleProps = {
  hidden: boolean;
};

export const PageTitle: FC<PageTitleProps> = ({ hidden }) => {
  const title = useSelector(selectPageTitle);
  const classes = useStyles();

  return (
    <Typography
      variant="h4"
      component="h1"
      className={clsx(classes.title, hidden && classes.titleHidden)}
    >
      {title}
    </Typography>
  );
};
