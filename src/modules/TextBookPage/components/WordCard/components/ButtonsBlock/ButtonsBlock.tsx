import React from 'react';
import { Button, withStyles, useTheme } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import { Container } from './styled';

type Props = {
  colorGroup: string;
  isBtnDelete: boolean;
  btnName: string;
};

export const ButtonsBlock: React.FC<Props> = ({
  colorGroup,
  isBtnDelete,
  btnName,
}) => {
  const theme = useTheme();

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
    <Container theme={theme}>
      <DifficultBtn variant="contained">{btnName}</DifficultBtn>
      {isBtnDelete && <DeleteBtn variant="contained">delete</DeleteBtn>}
    </Container>
  );
};
