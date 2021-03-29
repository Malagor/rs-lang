import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { AudioCartStyled } from './styled';

type AudioCardProps = {
  word: Word;
  variants: string[];
};

export const AudioCard: FC<AudioCardProps> = ({ word, variants }) => (
  <AudioCartStyled>
    <Question word={word} />
    <Answers answers={variants} correctAnswer={word.wordTranslate} />
  </AudioCartStyled>
);
