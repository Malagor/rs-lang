import React, { FC } from 'react';
import { useStyles } from './styled';

export const Accuracy: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Accuracy</h2>
      <div className={classes.progressBar} />
    </div>
  );
};
