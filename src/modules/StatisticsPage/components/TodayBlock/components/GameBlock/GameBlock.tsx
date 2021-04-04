import React, { FC } from 'react';
import { useStyles } from './styled';

type GameBlockProps = {
  img: string;
  name: string;
  color: string;
  statistics: {
    words: number;
    accuracy: number;
    inRow: number;
  };
};

export const GameBlock: FC<GameBlockProps> = ({
  img,
  name,
  color,
  statistics,
}) => {
  const classes = useStyles({ color });
  const { words, accuracy, inRow } = statistics;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.icon} src={img} alt={name} />
        <h3 className={classes.title}>{name}</h3>
      </div>
      <div className={classes.body}>
        <div className={classes.item}>
          <span className={classes.value}>{accuracy}%</span>
          <span>accuracy</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>{words}</span>
          <span>words</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>{inRow}</span>
          <span>in a row</span>
        </div>
      </div>
    </div>
  );
};
