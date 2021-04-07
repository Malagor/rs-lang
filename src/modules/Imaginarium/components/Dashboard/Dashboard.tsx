import React, { FC } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Countdown, FullscreenButton, SoundButton } from 'components';
import { GameplayCountdown } from './components';
import {
  DashboardContainer,
  InitialCountdownContainer,
  AnswerStats,
  WrongWord,
  RightWord,
} from './styled';

type DashboardProps = {
  isFullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  isSoundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement>;
  hasStarted: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  hasFinished: boolean;
  initialCountdownTime: number;
  rightAnswers: number;
  wrongAnswers: number;
  round: number;
  countdownTime: number;
  animationIsPlaying: boolean;
  handleCountdownEnd(): void | [boolean, number];
};

export const Dashboard: FC<DashboardProps> = ({
  isFullscreen,
  setFullscreen,
  isSoundOn,
  setSoundOn,
  containerRef,
  hasStarted,
  setStarted,
  hasFinished,
  initialCountdownTime,
  rightAnswers,
  wrongAnswers,
  round,
  countdownTime,
  animationIsPlaying,
  handleCountdownEnd,
}) => {
  const theme = useTheme();
  return (
    <DashboardContainer>
      <SoundButton isSoundOn={isSoundOn} setSoundOn={setSoundOn} />

      <FullscreenButton
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
        containerRef={containerRef}
      />
      <InitialCountdownContainer gameIsStarted={hasStarted}>
        <Countdown
          duration={initialCountdownTime}
          onComplete={() => setStarted(true)}
        />
      </InitialCountdownContainer>
      <AnswerStats breakpoints={theme.breakpoints}>
        <WrongWord>Wrong:&nbsp;</WrongWord>
        {wrongAnswers}
      </AnswerStats>
      <GameplayCountdown
        hasStarted={hasStarted}
        hasFinished={hasFinished}
        round={round}
        countdownTime={countdownTime}
        animationIsPlaying={animationIsPlaying}
        handleCountdownEnd={handleCountdownEnd}
      />
      <AnswerStats breakpoints={theme.breakpoints}>
        <RightWord>Right:&nbsp;</RightWord>
        {rightAnswers}
      </AnswerStats>
    </DashboardContainer>
  );
};
