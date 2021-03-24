import React, { FC } from 'react';
import { Word } from 'types';
import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectGroup } from 'modules/TextBookPage/selectors';
import { WordCard } from '../WordCard';
import { WordListStyled } from './styled';

const arrayColors = [
  '#F2695C',
  '#F2A663',
  '#FAAABA',
  '#88BFB0',
  '#60A4BF',
  '#59484D',
];

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => {
  const group = useSelector(selectGroup);
  return (
    <WordListStyled>
      {words.map((word) => (
        <Paper key={word.id}>
          <WordCard
            word={word}
            colorGroup={arrayColors[group]}
            countIntoRedBlock={5}
            countIntoGreenBlock={10}
            isTranslate={true}
            isButtons={true}
          />
        </Paper>
      ))}
    </WordListStyled>
  );
};
