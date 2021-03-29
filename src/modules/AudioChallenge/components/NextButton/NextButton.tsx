import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styled';

type NextButtonProps = {
  clickHandler: () => void;
  label: string;
};

export const NextButton: FC<NextButtonProps> = ({ clickHandler, label }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.root} onClick={clickHandler}>
      {label}
    </Button>
  );
};
