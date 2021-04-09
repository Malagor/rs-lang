import React, { FC } from 'react';
import { GameStatisticBoard } from './components';

type GameStatisticBoardProps = {
  timeGame: number;
};

export const PlayPage: FC<GameStatisticBoardProps> = ({ timeGame }) => {
  const test = 1;
  return (
    <>
      <GameStatisticBoard timeGame={timeGame} />
    </>
  );
};
