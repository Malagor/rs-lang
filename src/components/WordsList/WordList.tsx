import React, { FC } from 'react';
import { DifficultyType, Word } from 'types';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'modules/TextBookPage/selectors';
import { WordCard } from 'components';
import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulty: DifficultyType;
  isButtons: boolean;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
  group: number;
  page: number;
};

export const WordList: FC<WordListProps> = ({
  group,
  page,
  words,
  checkedDifficulty,
  isButtons,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const isLoading = useSelector(selectIsLoading);

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
                successCount={wordStatistics?.correct || 0}
                errorCount={wordStatistics?.incorrect || 0}
                isTranslate={true}
                isButtons={isButtons}
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
