import React, { FC } from 'react';
import { CircularProgressBar } from 'components/CircularProgressBar';
import { useStyles } from './styled';

type AccuracyProps = {
  percentage: number;
};

export const Accuracy: FC<AccuracyProps> = ({ percentage }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Accuracy</h2>
      <CircularProgressBar
        percentage={percentage}
        className={classes.progressBar}
      />
    </div>
  );
};
