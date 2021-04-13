import { Paper } from '@material-ui/core';
import React, { FC } from 'react';
import { COUNT_GROUPS } from 'appConstants';
import { useStyles } from './styled';
import { GroupButton } from './components';

type ChooseDifficultyProps = {
  chosenGameLink: string;
};

export const ChooseDifficulty: FC<ChooseDifficultyProps> = ({
  chosenGameLink,
}) => {
  const classes = useStyles();

  const getGroupButtons = () => {
    const groupButtons = [];
    for (let i = 0; i < COUNT_GROUPS; i++) {
      groupButtons.push(
        <GroupButton key={i} group={i} chosenGameLink={chosenGameLink} />
      );
    }
    return groupButtons;
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <h3 className={classes.selectHeader}>Select the Level</h3>
        <Paper variant="outlined" className={classes.groupButtonsContainer}>
          {getGroupButtons()}
        </Paper>
      </div>
    </div>
  );
};
