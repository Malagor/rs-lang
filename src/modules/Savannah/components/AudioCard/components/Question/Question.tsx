import React, { FC } from 'react';
import { Word } from 'types';
import { QuestionWrapper, CurrentWord } from './styled';

type QuestionProps = {
  word: Word;
  hasAnswer: boolean;
};

export const Question: FC<QuestionProps> = ({ word, hasAnswer }) => (
  <QuestionWrapper>
    <CurrentWord>{word.word}</CurrentWord>
  </QuestionWrapper>
);
