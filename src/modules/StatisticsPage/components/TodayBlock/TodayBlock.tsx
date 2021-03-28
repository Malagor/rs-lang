import React, { FC } from 'react';
import { gamesData } from 'appConstants/games';
import { LearnedWords } from './components/LearnedWords';
import { Accuracy } from './components/Accuracy';
import { GameBlock } from './components/GameBlock';
import { useStyles } from './styled';

export const TodayBlock: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LearnedWords />
      <Accuracy />
      {gamesData.map((game) => (
        <GameBlock key={game.name} img={game.img} name={game.name} />
      ))}
    </div>
  );
};
