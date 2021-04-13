import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { COUNT_GROUPS } from 'appConstants';
import { Word } from 'types';
import { selectGameWords } from 'modules/TextBookPage/selectors';
import { useStyles } from './styled';
import { GroupButton } from './components';

type ChooseDifficultyProps = {
  chosenGameLink: string;
};

export const ChooseDifficulty: FC<ChooseDifficultyProps> = ({
  chosenGameLink,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const gameWords: Word[] = useSelector(selectGameWords);

  const getGroupButtons = () => {
    const groupButtons = [];
    for (let i = 0; i < COUNT_GROUPS; i++) {
      groupButtons.push(<GroupButton key={i} group={i} />);
    }
    return groupButtons;
  };

  useEffect(() => {
    if (gameWords.length) {
      history.push(chosenGameLink);
    }
  }, [gameWords.length, chosenGameLink, history]);

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
