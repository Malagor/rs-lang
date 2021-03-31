import React, { FC } from 'react';
import { Word } from 'types';
import { useSelector } from 'react-redux';
import { selectTextBookGroup } from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { NavGame } from 'components';
import { WordCard } from '../WordCard';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => {
  const group = useSelector(selectTextBookGroup);
  const hasWords = words.filter((word) => word.userWord?.difficulty !== 'easy')
    .length;

  return hasWords ? (
    <WordListStyled>
      <NavGame />

      {words.map((word) => {
        const isDeleted = word.userWord?.difficulty === 'easy';
        const wordStatistics = word.userWord?.optional?.statistics;

        return (
          !isDeleted && (
            <WordCard
              key={word.word}
              word={word}
              colorGroup={LEVEL_COLORS[group]}
              successCount={wordStatistics?.correct || 0}
              errorCount={wordStatistics?.incorrect || 0}
              isTranslate={true}
              isButtons={true}
              showBtnDelete={true}
              showBtnRestore={false}
            />
          )
        );
      })}
    </WordListStyled>
  ) : (
    <NoWordsMessage />
  );
};
