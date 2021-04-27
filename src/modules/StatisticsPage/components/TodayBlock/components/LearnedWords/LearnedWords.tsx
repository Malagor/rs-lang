import React, { FC } from 'react';
import { useStyles } from './styled';

type LearnedWordsProps = {
  learnedWords: number;
};

export const LearnedWords: FC<LearnedWordsProps> = ({ learnedWords }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.number}>{learnedWords}</h2>
      <div>
        <h3 className={classes.title}>words</h3>
        <span className={classes.subtitle}>were learned</span>
      </div>
    </div>
  );
};
