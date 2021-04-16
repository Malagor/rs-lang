import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { SavannahCartStyled } from './styled';

type Props = {
  word: Word;
  variants: string[];
  correctIndex: number;
  onUserAnswer: (answerIndex: number) => void;
  userChoice: number;
  onFinishRound: (flag: boolean) => void;
  isFinishRound: boolean;
};

//eslint-disable-next-line @typescript-eslint/comma-dangle

export enum UserAnswer {
  NO_ANSWER = 'no answer',
  RIGHT = 'right answer',
  WRONG = 'wrong answer',
}

export const SavannahCard: FC<Props> = ({
  word,
  variants,
  correctIndex,
  onUserAnswer,
  userChoice,
  onFinishRound,
  isFinishRound,
}) => {
  const userAnswerState = () => {
    if (userChoice === -1) return UserAnswer.NO_ANSWER;
    return correctIndex === userChoice ? UserAnswer.RIGHT : UserAnswer.WRONG;
  };

  return (
    <SavannahCartStyled>
      <Question
        word={word}
        userAnswerState={userAnswerState()}
        setFinishRound={onFinishRound}
        setUserAnswer={onUserAnswer}
      />
      <Answers
        answers={variants}
        correctAnswerIndex={correctIndex}
        onUserAnswer={onUserAnswer}
        userChoice={userChoice}
      />
    </SavannahCartStyled>
  );
};
