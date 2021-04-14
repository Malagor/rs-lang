import React, { FC } from 'react';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { WordImageContainer, Image } from './styled';

type WordImageProps = {
  word: Word;
  index: number;
  rightWord: string;
  wrongWord: string;
  ANIMATION_TIME: number;
  handleImageClick(word: Word): void;
};

export const WordImage: FC<WordImageProps> = ({
  word,
  index,
  rightWord,
  wrongWord,
  ANIMATION_TIME,
  handleImageClick,
}) => (
  <div>
    <WordImageContainer key={word.word} number={index + 1}>
      <Image
        src={`${SERVER_URL}${word.image}`}
        alt={word.word}
        onClick={() => handleImageClick(word)}
        word={word.word}
        rightWord={rightWord}
        wrongWord={wrongWord}
        animationTime={ANIMATION_TIME}
      />
    </WordImageContainer>
  </div>
);
