import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { URL_DICTIONARY, URL_TEXT_BOOK } from 'appConstants/url';
import { selectPageTitle } from 'store/commonState/selectors';
import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { TitleWrapper, useStyles } from './styled';
import { TextBookSettings } from './components';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const location = useLocation();
  const title = useSelector(selectPageTitle);
  const classes = useStyles();

  return (
    <TitleWrapper>
      <Typography variant="h4" component="h1" className={classes.title}>
        {title}
      </Typography>

      {location.pathname === URL_DICTIONARY && <StatisticModal />}

      {[URL_DICTIONARY, URL_TEXT_BOOK].includes(location.pathname) && (
        <TextBookSettings />
      )}
    </TitleWrapper>
  );
};
