import React, { FC, useEffect, useRef } from 'react';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { SERVER_URL } from 'appConstants';
import {
  QuestionWrapper,
  IconWrapper,
  ImageWrapper,
  CurrentWord,
  InfoBlock,
} from './styled';

type QuestionProps = {
  word: Word;
  hasAnswer: boolean;
};

export const Question: FC<QuestionProps> = ({ word, hasAnswer }) => {
  const refAudioWord = useRef<HTMLAudioElement>(null);

  const onPlay = () => {
    if (refAudioWord.current) {
      refAudioWord.current.play();
    }
  };

  useEffect(() => {
    if (refAudioWord.current) {
      refAudioWord.current.play();
    }
  }, [word]);

  return (
    <QuestionWrapper>
      <ImageWrapper hasAnswer={hasAnswer}>
        <img src={`${SERVER_URL}${word.image}`} alt={word.word} />
      </ImageWrapper>
      <InfoBlock>
        {refAudioWord && (
          <IconWrapper onClick={onPlay} hasAnswer={hasAnswer}>
            <VolumeUpIcon />
          </IconWrapper>
        )}
        <audio
          ref={refAudioWord}
          src={`${SERVER_URL}${word.audio}`}
          autoPlay={true}
        >
          <track kind="captions" />{' '}
        </audio>
        {hasAnswer && <CurrentWord>{word.word}</CurrentWord>}
      </InfoBlock>
    </QuestionWrapper>
  );
};
