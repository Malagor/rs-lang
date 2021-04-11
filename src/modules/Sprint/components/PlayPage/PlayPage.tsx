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
};

const getRandomIntInclusive = (min: number, max: number) => {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1; // Максимум и минимум включаются
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
}) => {
  useEffect(() => {
    setNumNextWord();
  }, []);

  const handleRightButton = () => {
    if (isRightCase) {
      setGamePoints(gamePoints + 10);
    }
    setNumNextWord();
  };

  const handleWrongButton = () => {
    if (!isRightCase) {
      setGamePoints(gamePoints + 10);
    }
    setNumNextWord();
  };

  return (
    <>
      <GameStatisticBoard
        timeGame={timeGame}
        setGamePage={setGamePage}
        gamePoints={gamePoints}
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
