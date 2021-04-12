import React, { FC } from 'react';
import { DifficultyType, Word } from 'types';
import { useSelector } from 'react-redux';
import {
  selectIsButtons,
  selectIsLoading,
  selectIsTranslate,
  selectTextBookGroup,
} from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { WordCard } from 'components';
import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulty: DifficultyType;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
};

export const WordList: FC<WordListProps> = ({
  words,
  checkedDifficulty,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const group = useSelector(selectTextBookGroup);
  const isLoading = useSelector(selectIsLoading);
  const isTranslate = useSelector(selectIsTranslate);
  const isButtons = useSelector(selectIsButtons);

  const countWords = words.filter(
    (word) => word.userWord?.difficulty !== checkedDifficulty
  ).length;

  return countWords || isLoading ? (
    <>
      <StatisticModal />
      <WordListStyled>
        {words.map((word) => {
          const correctWord = word.userWord?.difficulty !== checkedDifficulty;
          const wordStatistics = word.userWord?.optional?.statistics;

          return (
            correctWord && (
              <WordCard
                key={word.word}
                word={word}
                colorGroup={LEVEL_COLORS[group]}
                successCount={wordStatistics?.correct || 0}
                errorCount={wordStatistics?.incorrect || 0}
                isTranslate={isTranslate}
                isButtons={isButtons}
                showBtnDeleteDifficult={showBtnDeleteDifficult}
                showBtnRestore={showBtnRestore}
              />
            )
          );
        })}
      </WordListStyled>
    </>
  ) : (
    <NoWordsMessage />
  );
};
