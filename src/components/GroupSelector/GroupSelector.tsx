import React, { FC } from 'react';
import { COUNT_GROUPS } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { ButtonGroupSelector } from './components';
import { GroupSelectorStyled, useStyles } from './styled';

type GroupSelectorProps = {
  isOpacity: boolean;
  group: number;
  onGroupChange: (group: number) => void;
};

export const GroupSelector: FC<GroupSelectorProps> = ({
  isOpacity,
  onGroupChange,
  group,
}) => {
  const arrayNumberOfPage = Array.from({ length: COUNT_GROUPS }, (v, k) => k);

  const colorText = LEVEL_COLORS[group];

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
                  onChangeGroupHandler={() => onGroupChange(numberGroup)}
                  isActivePage={numberGroup === group}
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
