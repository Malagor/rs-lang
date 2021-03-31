import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { AudioCartStyled } from './styled';

type AudioCardProps = {
  word: Word;
  variants: string[];
  correctIndex: number;
  onUserAnswer: (answerIndex: number) => void;
};

export const AudioCard: FC<AudioCardProps> = ({
  word,
  variants,
  correctIndex,
  onUserAnswer,
}) => (
  <AudioCartStyled>
    <Question word={word} />
    <Answers
      answers={variants}
      correctAnswer={correctIndex}
      onUserAnswer={onUserAnswer}
    />
  </AudioCartStyled>
);
