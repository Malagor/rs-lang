import React, { FC } from 'react';
import { Word } from 'types';
import { RESOURCE_URL } from 'appConstants';
import { WordCard, WordCardTitle, WordListStyled } from './styled';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => (
  <WordListStyled>
    {words.map((word) => (
      <WordCard key={word.id}>
        <WordCardTitle>
          {word.word} - {word.wordTranslate}
        </WordCardTitle>
        <img src={`${RESOURCE_URL}${word.image}`} alt={word.word} />
      </WordCard>
    ))}
  </WordListStyled>
);
