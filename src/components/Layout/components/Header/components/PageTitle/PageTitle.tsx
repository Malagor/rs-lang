import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import { selectRefStatistic } from 'modules/TextBookPage/selectors';
import { selectPageTitle } from 'store/commonState/selectors';
import { iconStyles, TitleWrapper, useStyles } from './styled';
import { TextBookSettings } from './components';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const title = useSelector(selectPageTitle);
  const refStatistic = useSelector(selectRefStatistic);
  const classes = useStyles();

  return (
    <TitleWrapper>
      <Typography variant="h4" component="h1" className={classes.title}>
        {title}
      </Typography>
      {title === 'Dictionary' && (
        <TimelineIcon
          style={iconStyles}
          titleAccess="Statistic"
          onClick={() => refStatistic?.click()}
        />
      )}
      {(title === 'Dictionary' || title === 'TextBook') && <TextBookSettings />}
    </TitleWrapper>
  );
};
