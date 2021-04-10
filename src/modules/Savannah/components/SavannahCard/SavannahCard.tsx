import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { SavannahCartStyled } from './styled';

type Props = {
  word: Word;
  variants: string[];
  correctIndex: string;
  onUserAnswer: (answerIndex: string) => void;
  userChoice: string;
};

export const SavannahCard: FC<Props> = ({
  word,
  variants,
  correctIndex,
  onUserAnswer,
  userChoice,
}) => {
  const isRightAnswer = correctIndex === userChoice;
  return (
    <SavannahCartStyled>
      <Question word={word} hasAnswer={isRightAnswer} />
      <Answers
        answers={variants}
        correctAnswerIndex={correctIndex}
        onUserAnswer={onUserAnswer}
        userChoice={userChoice}
      />
    </SavannahCartStyled>
  );
};
