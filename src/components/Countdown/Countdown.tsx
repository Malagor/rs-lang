import React, { FC } from 'react';
import styled from 'styled-components/macro';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_YELLOW,
} from 'appConstants/colors';
import {
  CountdownCircleTimer,
  CountdownCircleTimerProps,
} from 'react-countdown-circle-timer';

type CountdownProps = {
  duration: number;
  onComplete?: CountdownCircleTimerProps['onComplete'];
  isPlaying?: boolean;
  key?: number;
};

export const Countdown: FC<CountdownProps> = ({
  duration,
  onComplete,
  isPlaying = true,
  key,
}) => (
  <CountdownContainer>
    <CountdownCircleTimer
      key={key}
      size={100}
      strokeWidth={10}
      isPlaying={isPlaying}
      duration={duration}
      colors={[[COLOR_LAYOUT_BACKGROUND, 1]]}
      onComplete={onComplete}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  </CountdownContainer>
);

const CountdownContainer = styled.div`
  font-size: 35px;
  line-height: 35px;

  path:first-child {
    color: ${COLOR_LAYOUT_BACKGROUND};
    opacity: 0.3;
  }

  path:last-child {
    stroke: ${COLOR_LAYOUT_YELLOW};
  }
`;
