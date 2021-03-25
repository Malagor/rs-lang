import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { useTheme } from '@material-ui/core';
import { CardContainer, ContentBlock, WordImage } from './styled';
import { TopPart } from './components/TopPart';
import { SentencesBlock } from './components/SentencesBlock';
import { ButtonsBlock } from './components/ButtonsBlock';

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
        {isButtons && <ButtonsBlock colorGroup={colorGroup} />}
      </ContentBlock>
    </CardContainer>
  );
};
