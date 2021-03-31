import React, { FC } from 'react';
import { gamesData } from 'appConstants/games';
import { LearnedWords } from './components/LearnedWords';
import { Accuracy } from './components/Accuracy';
import { GameBlock } from './components/GameBlock';
import { useStyles } from './styled';

type TodayBlockProps = {
  accuracy: number;
  gamesStatistics: {
    [name: string]: {
      words: number;
      accuracy: number;
      inRow: number;
    };
  };
};

export const TodayBlock: FC<TodayBlockProps> = ({
  accuracy,
  gamesStatistics,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LearnedWords />
      <Accuracy percentage={accuracy} />
      {gamesData.map((game) => (
        <GameBlock
          key={game.name}
          img={game.img}
          name={game.name}
          color={game.color}
          statistics={gamesStatistics[game.name]}
        />
      ))}
    </div>
  );
};
