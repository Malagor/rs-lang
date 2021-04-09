import React, { FC } from 'react';
import { Countdown } from 'components';

type GameStatisticBoardProps = {
  timeGame: number;
};

export const GameStatisticBoard: FC<GameStatisticBoardProps> = ({
  timeGame,
}) => {
  const test = 1;

  return (
    <>
      <Countdown duration={timeGame} />
    </>
  );
};
