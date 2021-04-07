import React, { FC } from 'react';
import { useStyles } from './styled';

type GameBlockProps = {
  img: string;
  name: string;
  color: string;
  statistics: {
    learnedWords: number;
    accuracy: number;
    inARow: number;
  };
};

export const GameBlock: FC<GameBlockProps> = ({
  img,
  name,
  color,
  statistics,
}) => {
  const classes = useStyles({ color });
  const { learnedWords = 0, accuracy = 0, inARow = 0 } = statistics || {};

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.icon} src={img} alt={name} />
        <h3 className={classes.title}>{name}</h3>
      </div>
      <div className={classes.body}>
        <div className={classes.item}>
          <span className={classes.value}>{learnedWords}</span>
          <span>words</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>{accuracy}%</span>
          <span>accuracy</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>{inARow}</span>
          <span>in a row</span>
        </div>
      </div>
    </div>
  );
};
