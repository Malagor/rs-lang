import React from 'react';
import { HARD_DIFFICULTY, SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { lighten, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LEVEL_COLORS } from 'appConstants/colors';
import { selectUser } from 'modules/Login/selectors';
import { TopPart, SentencesBlock, ButtonsBlock } from './components';
import { CardContainer, ContentBlock, WordImage } from './styled';

type WordCardProps = {
  word: Word;
  successCount: number;
  errorCount: number;
  isTranslationShown: boolean;
  isButtonsShown: boolean;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
  page: number;
  group: number;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  successCount,
  errorCount,
  isTranslationShown,
  isButtonsShown,
  showBtnDeleteDifficult,
  showBtnRestore,
  page,
  group,
}) => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const isLogin = !!user.id;
  // eslint-disable-next-line no-underscore-dangle
  const wordId = word._id || word.id;
  const isHard = word.userWord && word.userWord.difficulty === HARD_DIFFICULTY;
  const colorGroup = LEVEL_COLORS[group];

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
          isTranslationShown={isTranslationShown}
        />
        <SentencesBlock word={word} isTranslationShown={isTranslationShown} />
        {isButtonsShown && isLogin && (
          <ButtonsBlock
            colorGroup={colorGroup}
            wordId={wordId}
            showBtnDeleteDifficult={showBtnDeleteDifficult}
            isHard={isHard}
            showBtnRestore={showBtnRestore}
            page={page}
            group={group}
          />
        )}
      </ContentBlock>
    </CardContainer>
  );
};
