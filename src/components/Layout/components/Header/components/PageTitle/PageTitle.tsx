import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import { selectRefStatistic } from 'modules/TextBookPage/selectors';
import { selectPageTitle } from 'store/commonState/selectors';
import { TitleWrapper, useStyles } from './styled';

type PageTitleProps = {};

export const PageTitle: FC<PageTitleProps> = () => {
  const title = useSelector(selectPageTitle);
  const refStatistic = useSelector(selectRefStatistic);
  const classes = useStyles();

  const iconStyles = {
    fontSize: '2rem',
    cursor: 'pointer',
    margin: '8px 0 0 5px',
  };

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
    </TitleWrapper>
  );
};
