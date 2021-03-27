import React, { FC } from 'react';
import { COUNT_GROUPS } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup } from 'modules/TextBookPage/actions';
import { selectGroup } from 'store/commonState/selectors';
import { LocStore } from 'services';
import { ButtonGroupSelector } from './components';
import { useStyles } from './styled';

export const GroupSelector: FC = () => {
  const dispatch = useDispatch();
  const arrayNumberOfPage = Array.from({ length: COUNT_GROUPS }, (v, k) => k);

  const groupPageNow = useSelector(selectGroup);

  const onChangeGroupPageHandler = (numberGroupPage: number) => {
    LocStore.setNumberGroupPage(numberGroupPage);
    dispatch(setGroup(numberGroupPage));
  };

  const colorText = LEVEL_COLORS[groupPageNow];

  const classes = useStyles();
  return (
    <Grid container xs={12} className={classes.wrapper}>
      <Paper
        elevation={3}
        style={{ color: `${colorText}` }}
        className={classes.paperWrapper}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={classes.textPosition}>
            Groups
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.buttonWrapper}>
          {arrayNumberOfPage.map((numberGroupPage: number) => (
            <Grid key={numberGroupPage} container justify="center">
              <ButtonGroupSelector
                onChangeGroupPageHandler={() =>
                  onChangeGroupPageHandler(numberGroupPage)
                }
                activePage={numberGroupPage === groupPageNow}
                color={LEVEL_COLORS[numberGroupPage]}
              >
                {numberGroupPage + 1}
              </ButtonGroupSelector>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};
