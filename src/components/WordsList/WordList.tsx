import React, { FC } from 'react';
import { Word } from 'types';
import { useSelector } from 'react-redux';
import { selectTextBookGroup } from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { NavGame, WordCard } from 'components';
// import { StatisticModal } from 'modules/DictionaryPage/components/StatisticModal';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components';

type WordListProps = {
  words: Word[];
  checkedDifficulty: string;
  isButtons: boolean;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
};

export const WordList: FC<WordListProps> = ({
  words,
  checkedDifficulty,
  isButtons,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const group = useSelector(selectTextBookGroup);
  const hasWords = words.filter(
    (word) => word.userWord?.difficulty !== checkedDifficulty
  ).length;

  return hasWords ? (
    <WordListStyled>
      <NavGame />
      {/* <StatisticModal /> */}

      {words.map((word) => {
        const unsuitableWord = word.userWord?.difficulty === checkedDifficulty;
        const wordStatistics = word.userWord?.optional?.statistics;

        return (
          !unsuitableWord && (
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
