import React from 'react';
import { Word } from 'types';

import { Container, Sentence, SentenceTranslate } from './styled';

type Props = {
  word: Word;
  isTranslate: boolean;
};

export const SentencesBlock: React.FC<Props> = ({
  word,
  isTranslate,
}) => (
  <Container>
    <div>
      <Sentence dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
      {isTranslate && (
        <SentenceTranslate>{word.textMeaningTranslate}</SentenceTranslate>
      )}
    </div>
    <div>
      <Sentence dangerouslySetInnerHTML={{ __html: word.textExample }} />
      {isTranslate && (
        <SentenceTranslate>{word.textExampleTranslate}</SentenceTranslate>
      )}
    </div>
  </Container>
);
