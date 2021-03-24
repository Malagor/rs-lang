import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { Container } from './styled';

type Props = {
  colorGroup: string;
};

export const ButtonsBlock: React.FC<Props> = ({ colorGroup }) => {
  const DifficultBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: colorGroup,
      borderRadius: 0,
      color: 'white',
      '&:hover': {
        background: colorGroup,
      },
    },
  })(Button);

  const DeleteBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: '#C4C4C4',
      borderRadius: 0,
      '&:hover': {
        background: '#C4C4C4',
      },
    },
  })(Button);

  return (
    <Container>
      <DifficultBtn variant="contained">difficult</DifficultBtn>
      <DeleteBtn variant="contained">delete</DeleteBtn>
    </Container>
  );
};
