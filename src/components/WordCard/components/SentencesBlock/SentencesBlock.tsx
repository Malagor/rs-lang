import React from 'react';
import { Word } from 'types';

import { Container, Sentence, SentenceTranslate } from './styled';

type Props = {
  word: Word;
  isTranslationShown: boolean;
};

export const SentencesBlock: React.FC<Props> = ({
  word,
  isTranslationShown,
}) => (
  <Container>
    <div>
      <Sentence dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
      {isTranslationShown && (
        <SentenceTranslate>{word.textMeaningTranslate}</SentenceTranslate>
      )}
    </div>
    <div>
      <Sentence dangerouslySetInnerHTML={{ __html: word.textExample }} />
      {isTranslationShown && (
        <SentenceTranslate>{word.textExampleTranslate}</SentenceTranslate>
      )}
    </div>
  </Container>
);
