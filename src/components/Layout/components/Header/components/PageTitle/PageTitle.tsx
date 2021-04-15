import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import { URL_DICTIONARY, URL_TEXT_BOOK } from 'appConstants/url';
import { selectRefStatistic } from 'modules/TextBookPage/selectors';
import { selectPageTitle } from 'store/commonState/selectors';
import { iconStyles, useStyles, TitleWrapper } from './styled';
import { TextBookSettings } from './components';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const location = useLocation();
  const title = useSelector(selectPageTitle);
  const refStatistic = useSelector(selectRefStatistic);
  const classes = useStyles();

  return (
    <TitleWrapper>
      <Typography variant="h4" component="h1" className={classes.title}>
        {title}
      </Typography>
      {location.pathname === URL_DICTIONARY && (
        <TimelineIcon
          onClick={() => refStatistic?.click()}
          style={iconStyles}
          titleAccess="Statistic"
        />
      )}
      {[URL_DICTIONARY, URL_TEXT_BOOK].includes(location.pathname) && (
        <TextBookSettings />
      )}
    </TitleWrapper>
  );
};
