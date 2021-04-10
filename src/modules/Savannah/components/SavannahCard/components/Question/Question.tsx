import React, { FC } from 'react';
import { Word } from 'types';
import { QuestionWrapper, CurrentWord, AnswerReaction } from './styled';

type QuestionProps = {
  word: Word;
  hasAnswer: boolean;
};

export const Question: FC<QuestionProps> = ({ word, hasAnswer }) => (
  <AnswerReaction userAnswer={hasAnswer}>
    <QuestionWrapper>
      <CurrentWord>{word.word}</CurrentWord>
    </QuestionWrapper>
  </AnswerReaction>
);
