import React, { FC } from 'react';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Paper } from '@material-ui/core';
import { WordListStyled } from './styled';
import { WordCard } from '../WordCard';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => (
  <WordListStyled>
    {words.map((word, index) => (
      <Paper key={word.id}>
        <WordCard word={word} />
      </Paper>
    ))}
  </WordListStyled>
);
