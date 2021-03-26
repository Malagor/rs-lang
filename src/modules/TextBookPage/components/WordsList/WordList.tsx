import React, { FC } from 'react';
import { Word } from 'types';
import { lighten, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectGroup } from 'modules/TextBookPage/selectors';
import { LEVEL_COLORS } from 'appConstants/colors';
import { WordCard } from '../WordCard';
import { WordListStyled } from './styled';
import { NoWordsMessage } from './components/NoWordsMessage/NoWordsMessage';

type WordListProps = {
  words: Word[];
};

export const WordList: FC<WordListProps> = ({ words }) => {
  const group = useSelector(selectGroup);
  const hasWords = words.filter((word) => word.userWord?.difficulty !== 'easy')
    .length;

  const difficultStyles = {
    backgroundColor: lighten(LEVEL_COLORS[group], 0.85),
  };

  return hasWords ? (
    <WordListStyled>
      {words.map((word) => {
        const isDeleted = word.userWord?.difficulty === 'easy';
        const isHard = word.userWord && word.userWord.difficulty === 'hard';

        return (
          !isDeleted && (
            <Paper key={word.id} style={isHard ? difficultStyles : {}}>
              <WordCard
                word={word}
                colorGroup={LEVEL_COLORS[group]}
                successCount={5}
                errorCount={10}
                isTranslate={true}
                isButtons={true}
              />
            </Paper>
          )
        );
      })}
    </WordListStyled>
  ) : (
    <NoWordsMessage />
  );
};
