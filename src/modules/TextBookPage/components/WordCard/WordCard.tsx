import React from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Button, withStyles } from '@material-ui/core';

import {
  CardContainer,
  ContentBlock,
  EnglishWord,
  WordBlock,
  TopPart,
  WordImage,
  WordTranscription,
  WordTranslate,
  SentencesBlock,
  Sentence,
  SentenceTranslate,
  ButtonsBlock,
} from './styled';

export type WordCardProps = {
  word: Word;
  color: string;
  hoverColor: string;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  color,
  hoverColor,
}) => {
  const DifficultBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: color,
      borderRadius: 0,
      color: 'white',
      '&:hover': {
        background: hoverColor,
      },
    },
  })(Button);

  const DeleteBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: '#C4C4C4',
      borderRadius: 0,
    },
  })(Button);
  return (
    <CardContainer>
      <WordImage url={`${SERVER_URL}${word.image}`} />

      <ContentBlock>
        <TopPart>
          <WordBlock>
            <EnglishWord>{word.word}</EnglishWord>
            <WordTranscription>{word.transcription}</WordTranscription>
            <WordTranslate>{word.wordTranslate}</WordTranslate>
          </WordBlock>
          <VolumeUpIcon style={{ fontSize: '2rem' }} />
        </TopPart>
        <SentencesBlock>
          <div>
            <Sentence dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            <SentenceTranslate>{word.textMeaningTranslate}</SentenceTranslate>
          </div>
          <div>
            <Sentence dangerouslySetInnerHTML={{ __html: word.textExample }} />
            <SentenceTranslate>{word.textExampleTranslate}</SentenceTranslate>
          </div>
        </SentencesBlock>

        <ButtonsBlock>
          <DifficultBtn variant="contained">difficult</DifficultBtn>
          <DeleteBtn variant="contained">delete</DeleteBtn>
        </ButtonsBlock>
      </ContentBlock>
    </CardContainer>
  );
};
