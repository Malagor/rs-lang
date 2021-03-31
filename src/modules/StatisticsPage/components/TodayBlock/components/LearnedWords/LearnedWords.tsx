import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectLearnedWords } from 'modules/StatisticsPage/selectors';
import { useStyles } from './styled';

export const LearnedWords: FC = () => {
  const classes = useStyles();
  const learnedWords = useSelector(selectLearnedWords);

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
