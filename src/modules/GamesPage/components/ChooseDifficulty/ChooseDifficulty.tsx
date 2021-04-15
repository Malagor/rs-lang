import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper, Fab } from '@material-ui/core';
import { COUNT_GROUPS } from 'appConstants';
import { ChosenGameProps, Word } from 'types';
import { selectGameWords } from 'modules/TextBookPage/selectors';
import { useStyles } from './styled';
import { GroupButton } from './components';

type ChooseDifficultyProps = {
  chosenGame: ChosenGameProps;
  setChosenGame: React.Dispatch<React.SetStateAction<ChosenGameProps | null>>;
};

export const ChooseDifficulty: FC<ChooseDifficultyProps> = ({
  chosenGame: { gameName, gameLink, gameColor },
  setChosenGame,
}) => {
  const classes = useStyles({ gameColor });
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
      history.push(gameLink);
    }
  }, [gameWords.length, gameLink, history]);

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <h2 className={classes.gameName}>{gameName}</h2>
        <h3 className={classes.selectHeader}>Select the Level</h3>
        <Paper variant="outlined" className={classes.groupButtonsContainer}>
          {getGroupButtons()}
        </Paper>
        <Fab
          variant="extended"
          aria-label="back"
          className={classes.backButton}
          onClick={() => {
            setChosenGame(null);
          }}
        >
          Back
        </Fab>
      </div>
    </div>
  );
};
