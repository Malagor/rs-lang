import React, { FC } from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { FullScreenWrapper } from './styled';

type FullScreenButtonProps = {
  open: boolean;
  onOpen?: () => void;
};

export const FullScreenButton: FC<FullScreenButtonProps> = ({
  open,
  onOpen,
}) => (
  <FullScreenWrapper onClick={onOpen}>
    {open ? <FullscreenExitIcon /> : <FullscreenIcon />}
  </FullScreenWrapper>
);
