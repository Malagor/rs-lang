import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styled';

type NextButtonProps = {
  isAnswer: boolean;
  onAnswer: () => void;
};

export const NextButton: FC<NextButtonProps> = ({ isAnswer, onAnswer }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.root} onClick={onAnswer}>
      {isAnswer ? 'next word' : 'I don’t know'}
    </Button>
  );
};
