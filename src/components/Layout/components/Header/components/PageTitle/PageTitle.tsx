import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { selectPageTitle } from 'store/commonState/selectors';
import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { TitleWrapper, useStyles } from './styled';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const title = useSelector(selectPageTitle);
  const classes = useStyles();

  return (
    <TitleWrapper>
      <Typography variant="h4" component="h1" className={classes.title}>
        {title}
      </Typography>
      {title === 'Dictionary' && <StatisticModal />}
    </TitleWrapper>
  );
};
