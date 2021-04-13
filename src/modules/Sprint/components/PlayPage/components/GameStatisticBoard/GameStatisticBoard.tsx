import React, { FC } from 'react';
import { Countdown } from 'components';
import { Typography } from '@material-ui/core';
import { TGamePages, RESULTS_PAGE } from '../../../../Sprint';

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
  const handleComplete = () => {
    playFinishSound();
    setGamePage(RESULTS_PAGE);
  };

  return (
    <>
      <Countdown duration={timeGame} onComplete={handleComplete} />
      <Typography>{gamePoints}</Typography>
      <Typography>preMultiplier:{preMultiplier}</Typography>
      <Typography>multiplier:{multiplier}</Typography>
    </>
  );
};
