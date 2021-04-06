import React, { FC } from 'react';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { WordImageContainer, Image } from './styled';

type WordImageProps = {
  word: Word;
  index: number;
  rightId: string;
  wrongId: string;
  ANIMATION_TIME: number;
  handleImageClick(word: Word): void;
};

export const WordImage: FC<WordImageProps> = ({
  word,
  index,
  rightId,
  wrongId,
  ANIMATION_TIME,
  handleImageClick,
}) => (
  <div>
    <WordImageContainer key={word.word} number={index + 1} id={word.id}>
      <Image
        src={`${SERVER_URL}${word.image}`}
        alt={word.word}
        onClick={() => handleImageClick(word)}
        id={word.id}
        rightId={rightId}
        wrongId={wrongId}
        animationTime={ANIMATION_TIME}
      />
    </WordImageContainer>
  </div>
);
