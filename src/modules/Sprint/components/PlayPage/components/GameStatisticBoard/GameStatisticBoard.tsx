import React, { FC } from 'react';
import { Countdown } from 'components';
import { Typography, Grid, CardMedia } from '@material-ui/core';
import HARD_IMG from 'assets/images/heart.png';
import clsx from 'clsx';
import { TGamePages, RESULTS_PAGE } from '../../../../Sprint';
import { useStyles } from './styled';

type GameStatisticBoardProps = {
  timeGame: number;
  gamePoints: number;
  setGamePage: React.Dispatch<React.SetStateAction<TGamePages>>;
  preMultiplier: number;
  multiplier: number;
  playFinishSound: () => void;
};

export const GameStatisticBoard: FC<GameStatisticBoardProps> = ({
  timeGame,
  gamePoints,
  setGamePage,
  preMultiplier,
  multiplier,
  playFinishSound,
}) => {
  const classes = useStyles();

  const handleComplete = () => {
    playFinishSound();
    setGamePage(RESULTS_PAGE);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid className={classes.countdownPosition}>
        <Countdown duration={timeGame} onComplete={handleComplete} />
      </Grid>

      <Grid item className={classes.pointsWrapper}>
        <Typography variant="h4" className={classes.points}>
          Points: {gamePoints}
        </Typography>
      </Grid>

      <Grid item className={classes.indicatorPanel}>
        <CardMedia
          image={HARD_IMG}
          className={clsx(
            classes.indicatorImg,
            preMultiplier < 1 && classes.indicatorImgInactive
          )}
        />
        <CardMedia
          image={HARD_IMG}
          className={clsx(
            classes.indicatorImg,
            preMultiplier < 2 && classes.indicatorImgInactive
          )}
        />
        <CardMedia
          image={HARD_IMG}
          className={clsx(
            classes.indicatorImg,
            preMultiplier < 3 && classes.indicatorImgInactive
          )}
        />
      </Grid>

      <Grid>
        <Typography variant="h4" className={classes.multiplier}>
          X{multiplier}
        </Typography>
      </Grid>
    </Grid>
  );
};
