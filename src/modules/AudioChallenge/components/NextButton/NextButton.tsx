import React, { FC, RefObject } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styled';

type NextButtonProps = {
  clickHandler: () => void;
  label: string;
  buttonRef?: RefObject<HTMLButtonElement>;
  colorBtn?: 'primary' | 'secondary';
};

export const NextButton: FC<NextButtonProps> = ({
  clickHandler,
  label,
  buttonRef,
  colorBtn = 'primary',
}) => {
  const classes = useStyles({ color: colorBtn });

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
