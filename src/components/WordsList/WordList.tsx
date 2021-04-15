import React, { FC } from 'react';
import { DifficultyType, Word } from 'types';
import { useSelector } from 'react-redux';
import {
  selectIsButtonsShown,
  selectIsLoading,
  selectIsTranslationShown,
} from 'modules/TextBookPage/selectors';
import { WordCard } from 'components';
import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulties: DifficultyType[];
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
  group: number;
  page: number;
};

export const WordList: FC<WordListProps> = ({
  group,
  page,
  words,
  checkedDifficulties,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const isLoading = useSelector(selectIsLoading);
  const isTranslationShown = useSelector(selectIsTranslationShown);
  const isButtonsShown = useSelector(selectIsButtonsShown);

  const countWords = words.filter(
    (word) => !checkedDifficulties.includes(word.userWord?.difficulty!)
  ).length;

  return countWords || isLoading ? (
    <>
      <StatisticModal />
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
                successCount={wordStatistics?.correct || 0}
                errorCount={wordStatistics?.incorrect || 0}
                isTranslationShown={isTranslationShown}
                isButtonsShown={isButtonsShown}
                showBtnDeleteDifficult={showBtnDeleteDifficult}
                showBtnRestore={showBtnRestore}
                group={group}
                page={page}
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
