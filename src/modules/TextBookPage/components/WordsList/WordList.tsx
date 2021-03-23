import React, { FC } from 'react';
import { Word } from 'types';
import { Paper } from '@material-ui/core';
import { WordListStyled } from './styled';
import { WordCard } from '../WordCard';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => (
  <WordListStyled>
    {words.map((word) => (
      <Paper key={word.id}>
        <WordCard color='#F2695C' hoverColor='#f08278' word={word} />
      </Paper>
    ))}
  </WordListStyled>
);
