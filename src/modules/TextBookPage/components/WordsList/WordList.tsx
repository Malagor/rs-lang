import React, { FC } from 'react';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Paper } from '@material-ui/core';
import { WordCard, WordListStyled } from './styled';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => (
  <WordListStyled>
    {words.map((word, index) => (
      <Paper key={word.id}>
        <WordCard active={!!(index % 2)}>
          <h2>
            {word.word} - {word.wordTranslate}
          </h2>
          <img src={`${SERVER_URL}${word.image}`} alt={word.word} />
        </WordCard>
      </Paper>
    ))}
  </WordListStyled>
);
