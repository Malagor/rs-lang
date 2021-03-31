import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { AudioCartStyled } from './styled';

type AudioCardProps = {
  word: Word;
  variants: string[];
  correctIndex: string;
  onUserAnswer: (answerIndex: string) => void;
  userChoice: string;
};

export const AudioCard: FC<AudioCardProps> = ({
  word,
  variants,
  correctIndex,
  onUserAnswer,
  userChoice,
}) => (
  <AudioCartStyled>
    <Question word={word} hasAnswer={userChoice !== '-1'} />
    <Answers
      answers={variants}
      correctAnswerIndex={correctIndex}
      onUserAnswer={onUserAnswer}
      userChoice={userChoice}
    />
  </AudioCartStyled>
);
