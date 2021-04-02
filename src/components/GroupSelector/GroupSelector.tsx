import React, { FC } from 'react';
import { COUNT_GROUPS } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup } from 'modules/TextBookPage/actions';
import { selectGroup } from 'store/commonState/selectors';
import { LocStore } from 'services';
import { ButtonGroupSelector } from './components';
import { GroupSelectorStyled, useStyles } from './styled';

type GroupSelectorProps = {
  isOpacity: boolean;
};

export const GroupSelector: FC<GroupSelectorProps> = ({ isOpacity }) => {
  const dispatch = useDispatch();
  const arrayNumberOfPage = Array.from({ length: COUNT_GROUPS }, (v, k) => k);

  const groupNow: number = useSelector(selectGroup);

  const changeGroup = (numberGroup: number) => {
    LocStore.setNumberGroupPage(numberGroup);
    dispatch(setGroup(numberGroup));
  };

  const colorText = LEVEL_COLORS[groupNow];

  const theme = useTheme();
  const classes = useStyles({ theme, isOpacity });

  return (
    <GroupSelectorStyled isOpacity={isOpacity}>
      <Paper elevation={3} style={{ color: `${colorText}` }}>
        <Grid container className={classes.paperWrapper}>
          <Grid item className={classes.titleWrapper}>
            <Typography variant="subtitle1" className={classes.title}>
              Groups
            </Typography>
          </Grid>

          <Grid item className={classes.buttonWrapper}>
            <Grid container justify="center" alignItems="center">
              {arrayNumberOfPage.map((numberGroup: number) => (
                <ButtonGroupSelector
                  key={numberGroup}
                  onChangeGroupHandler={() => changeGroup(numberGroup)}
                  isActivePage={numberGroup === groupNow}
                  color={LEVEL_COLORS[numberGroup]}
                >
                  {numberGroup + 1}
                </ButtonGroupSelector>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </GroupSelectorStyled>
  );
};
