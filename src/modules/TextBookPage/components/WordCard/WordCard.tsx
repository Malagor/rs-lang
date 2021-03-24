import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { CardContainer, ContentBlock, WordImage } from './styled';
import { TopPart } from './TopPart';
import { SentencesBlock } from './SentencesBlock';
import { ButtonsBlock } from './ButtonsBlock';

type WordCardProps = {
  word: Word;
  colorGroup: string;
  countIntoRedBlock: number;
  countIntoGreenBlock: number;
  isTranslate: boolean;
  isButtons: boolean;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  colorGroup,
  countIntoRedBlock,
  countIntoGreenBlock,
  isTranslate,
  isButtons,
}) => (
  <CardContainer>
    <WordImage url={`${SERVER_URL}${word.image}`} />

    <ContentBlock>
      <TopPart
        word={word}
        colorGroup={colorGroup}
        countIntoRedBlock={countIntoRedBlock}
        countIntoGreenBlock={countIntoGreenBlock}
        isTranslate={isTranslate}
      />
      <SentencesBlock word={word} isTranslate={isTranslate} />
      {isButtons && <ButtonsBlock colorGroup={colorGroup} />}
    </ContentBlock>
  </CardContainer>
);
