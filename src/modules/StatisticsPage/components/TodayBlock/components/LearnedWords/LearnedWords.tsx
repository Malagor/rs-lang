import React, { FC } from 'react';
import { useStyles } from './styled';

export const LearnedWords: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.number}>20</h2>
      <div>
        <h3 className={classes.title}>words</h3>
        <span className={classes.subtitle}>were learned</span>
      </div>
    </div>
  );
};
