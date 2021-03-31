import React, { FC } from 'react';
import styled from 'styled-components';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

type SoundButtonProps = {
  isSoundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SoundButton: FC<SoundButtonProps> = ({
  isSoundOn,
  setSoundOn,
}) => (
  <SoundButtonContainer onClick={() => setSoundOn(!isSoundOn)}>
    {isSoundOn ? <MusicNoteIcon /> : <MusicOffIcon />}
  </SoundButtonContainer>
);

const SoundButtonContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 46px;
  cursor: pointer;
  transition: transform 0.2s;
  color: ${COLOR_LAYOUT_BACKGROUND};

  &:hover {
    transform: scale(1.2);
    color: ${COLOR_LAYOUT_WHITE};
  }
`;
