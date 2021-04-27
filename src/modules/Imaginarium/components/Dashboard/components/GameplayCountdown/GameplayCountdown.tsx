import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Countdown } from 'components';
import { useTheme } from '@material-ui/core/styles';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

type GameplayCountdownProps = {
  hasStarted: boolean;
  hasFinished: boolean;
  round: number;
  countdownTime: number;
  animationIsPlaying: boolean;
  handleCountdownEnd(): [boolean, number] | void;
};

export const GameplayCountdown: FC<GameplayCountdownProps> = ({
  hasStarted,
  hasFinished,
  round,
  countdownTime,
  animationIsPlaying,
  handleCountdownEnd,
}) => {
  const theme = useTheme();
  const { breakpoints } = theme;
  const { md: mdWidth, sm: smWidth } = theme.breakpoints.values;
  const [windowSize, setWindowSize] = useState<
    'small' | 'medium' | 'large' | null
  >(null);
  const windowWidth = useRef(document.body.clientWidth);

  const changeWindowSize = useCallback(() => {
    if (windowWidth.current < smWidth) {
      setWindowSize('small');
    } else if (windowWidth.current < mdWidth) {
      setWindowSize('medium');
    } else {
      setWindowSize('large');
    }
  }, [mdWidth, smWidth]);

  useEffect(() => {
    const handleResize = () => {
      windowWidth.current = document.body.clientWidth;
      changeWindowSize();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [changeWindowSize]);

  return (
    <CountdownContainer gameIsStarted={hasStarted} breakpoints={breakpoints}>
      <Countdown
        key={hasFinished ? -1 : round}
        duration={countdownTime}
        onComplete={handleCountdownEnd}
        size={pickTimerSize(windowSize)}
        strokeWidth={pickTimerSize(windowSize) / 10}
        isPlaying={hasStarted && !hasFinished && !animationIsPlaying}
      />
    </CountdownContainer>
  );
};

const CountdownContainer = styled.div<{
  gameIsStarted: boolean;
  breakpoints: Breakpoints;
}>`
  grid-column: 2;
  display: ${({ gameIsStarted }) => (gameIsStarted ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  ${(props) => props.breakpoints.down('sm')} {
    div {
      font-size: 28px;
    }
  }

  ${(props) => props.breakpoints.down('xs')} {
    div {
      font-size: 22px;
    }
  }
`;

function pickTimerSize(windowWidth: string | null) {
  switch (windowWidth) {
    case 'small':
      return 60;
    case 'medium':
      return 80;
    default:
      return 100;
  }
}
