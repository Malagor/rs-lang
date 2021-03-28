import React, { FC } from 'react';
import { useStyles } from './styled';

export const Accuracy: FC = () => {
  const classes = useStyles();

  return <div className={classes.container}>Accuracy</div>;
};
