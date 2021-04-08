import React, { FC } from 'react';
import { gamesData } from 'appConstants/games';
import { GameStatistics } from 'types';
import { Accuracy, GameBlock, LearnedWords } from './components';
import { useStyles } from './styled';

type TodayBlockProps = {
  learnedWords: number;
  accuracy: number;
  gamesStatistics: {
    [game: string]: GameStatistics;
  };
};

export const TodayBlock: FC<TodayBlockProps> = ({
  learnedWords,
  accuracy,
  gamesStatistics,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LearnedWords learnedWords={learnedWords} />
      <Accuracy percentage={accuracy} />
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
