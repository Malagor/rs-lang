import React, { FC, RefObject } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styled';

type NextButtonProps = {
  clickHandler: () => void;
  label: string;
  buttonRef?: RefObject<HTMLButtonElement>;
};

export const NextButton: FC<NextButtonProps> = ({
  clickHandler,
  label,
  buttonRef,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.root}
      onClick={clickHandler}
      ref={buttonRef}
    >
      {label}
    </Button>
  );
};
