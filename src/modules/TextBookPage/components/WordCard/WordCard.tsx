import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import {
  CardContainer,
  ContentBlock,
  EnglishWord,
  WordBlock,
  TopPart,
  WordImage,
  WordTranscription,
  WordTranslate,
} from './styled';

export type WordCardProps = {
  word: Word;
};

export const WordCard: React.FC<WordCardProps> = ({ word }) => (
  <CardContainer>
    <WordImage url={`${SERVER_URL}${word.image}`} />

    <ContentBlock>
      <TopPart>
        <WordBlock>
          <EnglishWord>{word.word}</EnglishWord>
          <WordTranscription>{word.transcription}</WordTranscription>
        </WordBlock>
        <WordTranslate>{word.wordTranslate}</WordTranslate>
      </TopPart>
      <VolumeUpIcon />
    </ContentBlock>
  </CardContainer>
);
