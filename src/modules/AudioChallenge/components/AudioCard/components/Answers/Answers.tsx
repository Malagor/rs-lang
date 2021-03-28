import React, { FC } from 'react';
import { AnswersWrapper, AnswerItem } from './styled';

type AnswersProps = {
  words: string[];
};

export const Answers: FC<AnswersProps> = ({ words }) => (
  <AnswersWrapper>
    {words.map((word, index) => (
      <AnswerItem key={word}>
        {index + 1} {word}
      </AnswerItem>
    ))}
  </AnswersWrapper>
);
