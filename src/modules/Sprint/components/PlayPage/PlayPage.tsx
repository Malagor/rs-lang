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
  createGameWords: () => void;
};

export const PlayPage: FC<GameStatisticBoardProps> = ({
  timeGame,
  setGamePage,
  gamePoints,
  setGamePoints,
  isRightCase,
  gameEnglishWord,
  gameTranslatedWord,
  createGameWords,
}) => {
  console.log('isRightCase ', isRightCase);

  const handleRightButton = () => {
    // console.log('handleRightButton ', isRightCase);
    if (isRightCase) {
      setGamePoints(gamePoints + 10);
    }
    createGameWords();
  };

  const handleWrongButton = () => {
    // console.log('handleWrongButton ', isRightCase);
    if (!isRightCase) {
      setGamePoints(gamePoints + 10);
    }
    const test = 1;
    createGameWords();
  };

  useEffect(() => {
    createGameWords();
  }, []);

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
