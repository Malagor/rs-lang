import React, { FC, useEffect, useState } from 'react';
import { Countdown, SoundButton, FullscreenButton } from 'components';
import { Typography, Box, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles, ModeAnswerButton } from './styled';

type GameStatisticBoardProps = {
  isFullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  isSoundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement>;
  timeGame: number;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
  gamePoints: number;
  setGamePoints: React.Dispatch<React.SetStateAction<number>>;
  isRightCase: boolean | null;
  gameEnglishWord: string;
  gameTranslatedWord: string;
  setNumNextWord: () => void;
  handleAnswerButton: (answer: boolean) => void;
  preMultiplier: number;
  multiplier: number;
  playFinishSound: () => void;
};

export const PlayPage: FC<GameStatisticBoardProps> = ({
  isFullscreen,
  setFullscreen,
  isSoundOn,
  setSoundOn,
  containerRef,
  timeGame,
  setFinish,
  gamePoints,
  setGamePoints,
  isRightCase,
  gameEnglishWord,
  gameTranslatedWord,
  setNumNextWord,
  handleAnswerButton,
  preMultiplier,
  multiplier,
  playFinishSound,
}) => {
  const classes = useStyles();

  const [isChangeMultiplier, setChangeMultiplier] = useState(false);

  useEffect(() => {
    setNumNextWord();
  }, [setNumNextWord]);

  const handleButton = (isCorrectAnswer: boolean | null) => {
    if (typeof isCorrectAnswer === 'boolean' && isCorrectAnswer) {
      setGamePoints(gamePoints + 10 * multiplier);
      handleAnswerButton(true);
    } else {
      handleAnswerButton(false);
    }
    setNumNextWord();
  };

  const handleComplete = () => {
    playFinishSound();
    setFinish(true);
  };

  useEffect(() => {
    setChangeMultiplier(true);
    setTimeout(() => {
      setChangeMultiplier(false);
    }, 600);
  }, [multiplier]);

  return (
    <Grid container className={classes.wrapper}>
      <SoundButton isSoundOn={isSoundOn} setSoundOn={setSoundOn} />
      <FullscreenButton
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
        containerRef={containerRef}
      />

      <Grid item className={classes.wrapperPoints}>
        <Typography variant="h4" className={classes.points}>
          {gamePoints}
        </Typography>
        <Typography
          variant="subtitle1"
          className={clsx(
            classes.pointsAdd,
            isChangeMultiplier && classes.changeColor
          )}
        >
          {`+${multiplier}0 points`}
        </Typography>

        <Box className={classes.wrapperIndicator}>
          <Box
            className={clsx(
              classes.indicator,
              preMultiplier < 1 && classes.indicatorInactive
            )}
          />
          <Box
            className={clsx(
              classes.indicator,
              preMultiplier < 2 && classes.indicatorInactive
            )}
          />
          <Box
            className={clsx(
              classes.indicator,
              preMultiplier < 3 && classes.indicatorInactive
            )}
          />
        </Box>
      </Grid>

      <Grid item className={classes.wrapperPaper}>
        <Paper elevation={0} className={classes.paperSize}>
          <Box className={classes.wrapperWords}>
            <Typography variant="h4" className={classes.englishWord}>
              {gameEnglishWord}
            </Typography>
            <Typography variant="h5" className={classes.translatedWord}>
              {gameTranslatedWord}
            </Typography>
          </Box>

          <Box className={classes.wrapperButtons}>
            <ModeAnswerButton
              onClick={() => handleButton(isRightCase)}
              variant="contained"
              color="primary"
              isRightAnswerButton={true}
            >
              right
            </ModeAnswerButton>
            <ModeAnswerButton
              onClick={() => handleButton(!isRightCase)}
              variant="contained"
              color="secondary"
            >
              wrong
            </ModeAnswerButton>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        <Countdown duration={timeGame} onComplete={handleComplete} />
      </Grid>
    </Grid>
  );
};
