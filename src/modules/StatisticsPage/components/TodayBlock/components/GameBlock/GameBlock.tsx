import React, { FC } from 'react';
import { useStyles } from './styled';

type GameBlockProps = {
  img: string;
  name: string;
};

export const GameBlock: FC<GameBlockProps> = ({ img, name }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.icon} src={img} alt={name} />
        <h3 className={classes.title}>{name}</h3>
      </div>
      <div className={classes.info}>
        <div className={classes.item}>
          <span className={classes.value}>20</span>
          <span>words</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>80%</span>
          <span>accuracy</span>
        </div>
        <div className={classes.item}>
          <span className={classes.value}>15</span>
          <span>in a row</span>
        </div>
      </div>
    </div>
  );
};
