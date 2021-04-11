import React from 'react';
import { HARD_DIFFICULTY, SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { lighten, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';
import { TopPart, SentencesBlock, ButtonsBlock } from './components';
import { CardContainer, ContentBlock, WordImage } from './styled';

type WordCardProps = {
  word: Word;
  colorGroup: string;
  successCount: number;
  errorCount: number;
  isTranslate: boolean;
  isButtons: boolean;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  colorGroup,
  successCount,
  errorCount,
  isTranslate,
  isButtons,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const isLogin = !!user.id;
  // eslint-disable-next-line no-underscore-dangle
  const wordId = word._id || word.id;
  const isHard = word.userWord && word.userWord.difficulty === HARD_DIFFICULTY;

  const difficultColor = lighten(colorGroup, 0.85);

  return (
    <CardContainer theme={theme} difficultColor={isHard ? difficultColor : ''}>
      <WordImage
        theme={theme}
        src={`${SERVER_URL}${word.image}`}
        alt={word.word}
      />

      <ContentBlock theme={theme}>
        <TopPart
          word={word}
          colorGroup={colorGroup}
          successCount={successCount}
          errorCount={errorCount}
          isTranslate={isTranslate}
        />
        <SentencesBlock word={word} isTranslate={isTranslate} />
        {isButtons && isLogin && (
          <ButtonsBlock
            colorGroup={colorGroup}
            wordId={wordId}
            showBtnDeleteDifficult={showBtnDeleteDifficult}
            isHard={isHard}
            showBtnRestore={showBtnRestore}
          />
        )}
      </ContentBlock>
    </CardContainer>
  );
};