import React, { FC } from 'react';
import { Word } from 'types';
import { AudioCartStyled } from './styled';
import { Answers } from './components';

type AudioCardProps = {
  word: Word;
  answers: string[];
};

export const AudioCard: FC<AudioCardProps> = ({ word, answers }) =>
  word && (
    <AudioCartStyled>
      <Answers words={answers}>Ответ 1</Answers>
    </AudioCartStyled>
  );
