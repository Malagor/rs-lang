import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
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
      color: COLOR_LAYOUT_WHITE,
      textTransform: 'lowercase',

      '&:hover': {
        background: colorGroup,
      },
    },
  })(Button);

  const DeleteBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: COLOR_LAYOUT_GRAY,
      borderRadius: 0,
      textTransform: 'lowercase',
      '&:hover': {
        background: COLOR_LAYOUT_GRAY,
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
