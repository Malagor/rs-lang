import React, { FC, useEffect, useRef } from 'react';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { SERVER_URL } from 'appConstants';
import { QuestionWrapper, IconWrapper } from './styled';

type QuestionProps = {
  word: Word;
};

export const Question: FC<QuestionProps> = ({ word }) => {
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
      {refAudioWord && (
        <IconWrapper onClick={onPlay}>
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
      {word.wordTranslate}
    </QuestionWrapper>
  );
};
