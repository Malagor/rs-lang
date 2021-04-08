import React, { FC } from 'react';
import { gamesData } from 'appConstants/games';
import { GameStatistics } from 'types';
import { Accuracy, GameBlock, LearnedWords } from './components';
import { useStyles } from './styled';

type TodayBlockProps = {
  gamesStatistics: {
    [game: string]: GameStatistics;
  };
};

export const TodayBlock: FC<TodayBlockProps> = ({ gamesStatistics }) => {
  const classes = useStyles();
  const accuracies = gamesStatistics
    ? gamesData.map(({ name }) => gamesStatistics?.[name]?.accuracy || 0)
    : [];
  const accuraciesSum = accuracies.reduce((a, b) => a + b, 0);
  const totalAccuracy = accuraciesSum
    ? Math.round(accuraciesSum / gamesData.length)
    : 0;

  return (
    <div className={classes.container}>
      <LearnedWords />
      <Accuracy percentage={totalAccuracy} />
      {gamesData.map((game) => (
        <GameBlock
          key={game.name}
          img={game.img}
          name={game.name}
          color={game.color}
          statistics={gamesStatistics?.[game.name]}
        />
      ))}
    </div>
  );
};
