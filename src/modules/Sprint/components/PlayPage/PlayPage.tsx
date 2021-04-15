import React, { FC, useEffect } from 'react';
import { Countdown, SoundButton, FullscreenButton } from 'components';
import { Button, Typography, Box, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { TGamePages, RESULTS_PAGE } from '../../Sprint';
import { useStyles } from './styled';

type GameStatisticBoardProps = {
  isFullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  isSoundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement>;
  timeGame: number;
  setGamePage: React.Dispatch<React.SetStateAction<TGamePages>>;
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
  setGamePage,
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

  useEffect(() => {
    setNumNextWord();
  }, []);

  const handleRightButton = () => {
    if (isRightCase) {
      setGamePoints(gamePoints + 10 * multiplier);
      handleAnswerButton(true);
    } else {
      handleAnswerButton(false);
    }
    setNumNextWord();
  };

  const handleWrongButton = () => {
    if (!isRightCase) {
      setGamePoints(gamePoints + 10 * multiplier);
      handleAnswerButton(true);
    } else {
      handleAnswerButton(false);
    }
    setNumNextWord();
  };

  const handleComplete = () => {
    playFinishSound();
    setGamePage(RESULTS_PAGE);
  };

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
        <Typography variant="subtitle1" className={classes.pointsAdd}>
          {`+${multiplier}0 points`}
        </Typography>
      </Grid>

      <Grid item className={classes.wrapperPaper}>
        <Paper elevation={0} className={classes.paperSize}>
          <Box className={classes.wrapperIndicator}>
            <Box
              className={clsx(
                classes.indicator,
                preMultiplier < 1 && classes.indicatorActive
              )}
            />
            <Box
              className={clsx(
                classes.indicator,
                preMultiplier < 2 && classes.indicatorActive
              )}
            />
            <Box
              className={clsx(
                classes.indicator,
                preMultiplier < 3 && classes.indicatorActive
              )}
            />
          </Box>

          <Box className={classes.wrapperWords}>
            <Typography variant="h4" className={classes.englishWord}>
              {gameEnglishWord}
            </Typography>
            <Typography variant="h5" className={classes.translatedWord}>
              {gameTranslatedWord}
            </Typography>
          </Box>

          <Box className={classes.wrapperButtons}>
            <Button
              className={clsx(classes.buttons, classes.right)}
              onClick={handleRightButton}
              variant="contained"
              color="primary"
            >
              right
            </Button>
            <Button
              className={clsx(classes.buttons, classes.wrong)}
              onClick={handleWrongButton}
              variant="contained"
              color="secondary"
            >
              wrong
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        <Countdown duration={timeGame} onComplete={handleComplete} />
      </Grid>
    </Grid>
  );
};
