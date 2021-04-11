import React, { FC } from 'react';
import { Countdown } from 'components';
import { Typography } from '@material-ui/core';
import { TGamePages, RESULTS_PAGE } from '../../../../Sprint';

type GameStatisticBoardProps = {
  timeGame: number;
  gamePoints: number;
  setGamePage: React.Dispatch<React.SetStateAction<TGamePages>>; // (page: TGamePages) => void;
  preMultiplier: number;
  multiplier: number;
};

export const GameStatisticBoard: FC<GameStatisticBoardProps> = ({
  timeGame,
  gamePoints,
  setGamePage,
  preMultiplier,
  multiplier,
}) => {
  const test = 1;

  return (
    <>
      <Countdown
        duration={timeGame}
        onComplete={() => setGamePage(RESULTS_PAGE)}
      />
      <Typography>{gamePoints}</Typography>
      <Typography>preMultiplier:{preMultiplier}</Typography>
      <Typography>multiplier:{multiplier}</Typography>
    </>
  );
};
