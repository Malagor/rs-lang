import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPageTitle } from 'store/commonState/selectors';
import { Typography } from '@material-ui/core';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const title = useSelector(selectPageTitle);
  return (
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
  );
};
