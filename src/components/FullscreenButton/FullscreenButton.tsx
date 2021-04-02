import React, { FC } from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import styled from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

type FullscreenButtonProps = {
  isFullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const FullscreenButton: FC<FullscreenButtonProps> = ({
  isFullscreen,
  setFullscreen,
  containerRef,
}) => {
  const handleFullScreenButtonClick = () => {
    const handleFullScreenOut = () => {
      if (document.fullscreenElement === null) {
        setFullscreen(false);
      }
    };
    if (containerRef && containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen().catch((err) => err);
        setFullscreen(true);
        document.addEventListener('fullscreenchange', handleFullScreenOut);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenOut);
    };
  };

  return (
    <FullScreenButtonContainer onClick={handleFullScreenButtonClick}>
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </FullScreenButtonContainer>
  );
};

const FullScreenButtonContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 30px;
  right: 46px;
  cursor: pointer;
  transition: transform 0.2s;
  color: ${COLOR_LAYOUT_BACKGROUND};

  &:hover {
    transform: scale(1.2);
    color: ${COLOR_LAYOUT_WHITE};
  }
`;
