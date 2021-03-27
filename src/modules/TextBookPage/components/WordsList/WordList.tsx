import React, { FC } from 'react';
import { Word } from 'types';
import { useSelector } from 'react-redux';
import { selectGroup } from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { NavGame } from 'components';
import { WordCard } from '../WordCard';
import { WordListStyled } from './styled';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => {
  const group = useSelector(selectGroup);
  return (
    <WordListStyled>
      <NavGame />
      {words.map((word) => (
        <WordCard
          key={word.word}
          word={word}
          colorGroup={LEVEL_COLORS[group]}
          successCount={5}
          errorCount={10}
          isTranslate={true}
          isButtons={true}
        />
      ))}
    </WordListStyled>
  );
};
