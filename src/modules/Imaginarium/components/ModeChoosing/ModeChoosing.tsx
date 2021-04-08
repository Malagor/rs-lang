import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Paper,
  Typography,
  Button,
  useTheme,
  lighten,
} from '@material-ui/core';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';

type ModeChoosingProps = {
  setModeChoosing: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

export const ModeChoosing: FC<ModeChoosingProps> = ({
  setModeChoosing,
  setMode,
}) => {
  const theme = useTheme();
  const handleModeButtonClick = (mode: string) => {
    setMode(mode);
    setModeChoosing(false);
  };

  return (
    <ModeContainer variant="outlined" theme={theme}>
      <ModeHeader variant="h4">Select playing mode</ModeHeader>

      <ButtonsContainer variant="body1">
        <ModeButton
          variant="contained"
          color="primary"
          onClick={() => handleModeButtonClick('Letters')}
        >
          Letters
        </ModeButton>

        <ModeButton
          variant="contained"
          color="primary"
          onClick={() => handleModeButtonClick('Sounds')}
        >
          Sounds
        </ModeButton>
      </ButtonsContainer>
    </ModeContainer>
  );
};

const ModeContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(3)}px`};
`;

const ModeHeader = styled(Typography)`
  margin-bottom: 20px;
`;

const ButtonsContainer = styled(Typography)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto;
  justify-content: space-around;
`;

const ModeButton = styled(Button)`
  background-color: ${COLOR_LAYOUT_BLUE};
  &:hover {
    background-color: ${lighten(COLOR_LAYOUT_BLUE, 0.2)};
  }
`;
