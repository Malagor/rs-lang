import React, { FC } from 'react';
import { DifficultyType, Word } from 'types';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'modules/TextBookPage/selectors';
import { WordCard } from 'components';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulties: DifficultyType[];
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
  checkedDifficulties,
  isButtons,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
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
  ) : (
    // </>
    <NoWordsMessage />
  );
};
