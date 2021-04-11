import React, { FC, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { TGamePages } from '../../Sprint';
import { GameStatisticBoard } from './components';

type GameStatisticBoardProps = {
  timeGame: number;
  setGamePage: React.Dispatch<React.SetStateAction<TGamePages>>; // (game: TGamePages) => void;
  gamePoints: number;
  setGamePoints: React.Dispatch<React.SetStateAction<number>>;
  isRightCase: boolean | null;
  gameEnglishWord: string;
  gameTranslatedWord: string;

  setNumNextWord: () => void;
  multiplierHandler: (answer: boolean) => void;
  preMultiplier: number;
  multiplier: number;
};

export const PlayPage: FC<GameStatisticBoardProps> = ({
  timeGame,
  setGamePage,
  gamePoints,
  setGamePoints,
  isRightCase,
  gameEnglishWord,
  gameTranslatedWord,

  setNumNextWord,
  multiplierHandler,
  preMultiplier,
  multiplier,
}) => {
  useEffect(() => {
    setNumNextWord();
  }, []);

  const handleRightButton = () => {
    if (isRightCase) {
      setGamePoints(gamePoints + 10 * multiplier);
      multiplierHandler(true);
    } else {
      multiplierHandler(false);
    }
    setNumNextWord();
  };

  const handleWrongButton = () => {
    if (!isRightCase) {
      setGamePoints(gamePoints + 10 * multiplier);
      multiplierHandler(true);
    } else {
      multiplierHandler(false);
    }
    setNumNextWord();
  };

  return (
    <>
      <GameStatisticBoard
        timeGame={timeGame}
        setGamePage={setGamePage}
        gamePoints={gamePoints}
        preMultiplier={preMultiplier}
        multiplier={multiplier}
      />
      <div>{gameEnglishWord}</div>
      <div>{gameTranslatedWord}</div>
      <Button onClick={handleRightButton} variant="contained" color="primary">
        right
      </Button>
      <Button onClick={handleWrongButton} variant="contained" color="secondary">
        wrong
      </Button>
    </>
  );
};
