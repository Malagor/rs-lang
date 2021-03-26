import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';
import { TopPart } from './components/TopPart';
import { SentencesBlock } from './components/SentencesBlock';
import { ButtonsBlock } from './components/ButtonsBlock';
import { CardContainer, ContentBlock, WordImage } from './styled';

type WordCardProps = {
  word: Word;
  colorGroup: string;
  successCount: number;
  errorCount: number;
  isTranslate: boolean;
  isButtons: boolean;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  colorGroup,
  successCount,
  errorCount,
  isTranslate,
  isButtons,
}) => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const isLogin = !!user.id;
  // eslint-disable-next-line no-underscore-dangle
  const wordId = word._id || word.id;

  return (
    <CardContainer theme={theme}>
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
          <ButtonsBlock colorGroup={colorGroup} wordId={wordId} />
        )}
      </ContentBlock>
    </CardContainer>
  );
};
