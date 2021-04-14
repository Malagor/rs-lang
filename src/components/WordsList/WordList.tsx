import React, { FC } from 'react';
import { DifficultyType, Word } from 'types';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectTextBookGroup,
} from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { WordCard } from 'components';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulties: DifficultyType[];
  isButtons: boolean;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
};

export const WordList: FC<WordListProps> = ({
  words,
  checkedDifficulties,
  isButtons,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const group = useSelector(selectTextBookGroup);
  const isLoading = useSelector(selectIsLoading);

  const countWords = words.filter(
    (word) => !checkedDifficulties.includes(word.userWord?.difficulty!)
  ).length;

  return countWords || isLoading ? (
    <WordListStyled>
      {words.map((word) => {
        const correctWord = !checkedDifficulties.includes(
          word.userWord?.difficulty!
        );
        const wordStatistics = word.userWord?.optional?.statistics;

        return (
          correctWord && (
            <WordCard
              key={word.word}
              word={word}
              colorGroup={LEVEL_COLORS[group]}
              successCount={wordStatistics?.correct || 0}
              errorCount={wordStatistics?.incorrect || 0}
              isTranslate={true}
              isButtons={isButtons}
              showBtnDeleteDifficult={showBtnDeleteDifficult}
              showBtnRestore={showBtnRestore}
            />
          )
        );
      })}
    </WordListStyled>
  ) : (
    <NoWordsMessage />
  );
};
