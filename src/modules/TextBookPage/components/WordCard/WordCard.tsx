import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
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
}) => (
  <CardContainer>
    <WordImage url={`${SERVER_URL}${word.image}`} />

    <ContentBlock>
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
