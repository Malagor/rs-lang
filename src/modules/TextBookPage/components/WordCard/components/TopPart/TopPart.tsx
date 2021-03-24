import React, { useRef } from 'react';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { SERVER_URL } from 'appConstants';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import {
  EnglishWord,
  WordBlock,
  WordTranscription,
  WordTranslate,
  WordStatistic,
  InfoBlock,
  Container,
  WrapperIconWithStatistic,
} from './styled';

export type WordCardProps = {
  word: Word;
  colorGroup: string;
  successCount: number;
  errorCount: number;
  isTranslate: boolean;
};

export const TopPart: React.FC<WordCardProps> = ({
  word,
  colorGroup,
  successCount,
  errorCount,
  isTranslate,
}) => {
  const refAudioWord = useRef<HTMLAudioElement>(null);
  const refAudioMeaning = useRef<HTMLAudioElement>(null);
  const refAudioExample = useRef<HTMLAudioElement>(null);

  const onPlay = () => {
    if (refAudioWord.current) {
      refAudioWord.current.play();
      refAudioWord.current.onended = () =>
        refAudioMeaning.current && refAudioMeaning.current.play();
    }

    if (refAudioMeaning.current)
      refAudioMeaning.current.onended = () =>
        refAudioExample.current && refAudioExample.current.play();
  };

  return (
    <Container>
      <WordBlock colorGroup={colorGroup}>
        <EnglishWord>{word.word}</EnglishWord>
        <WordTranscription>{word.transcription}</WordTranscription>
        {isTranslate && <WordTranslate>{word.wordTranslate}</WordTranslate>}
      </WordBlock>
      <WrapperIconWithStatistic>
        <VolumeUpIcon
          onClick={onPlay}
          style={{ fontSize: '2rem', cursor: 'pointer' }}
        />
        <audio ref={refAudioWord} src={`${SERVER_URL}${word.audio}`}>
          <track kind="captions" />{' '}
        </audio>
        <audio ref={refAudioMeaning} src={`${SERVER_URL}${word.audioMeaning}`}>
          <track kind="captions" />{' '}
        </audio>
        <audio ref={refAudioExample} src={`${SERVER_URL}${word.audioExample}`}>
          <track kind="captions" />{' '}
        </audio>
        <WordStatistic>
          <InfoBlock color={colorGroup}>{successCount}</InfoBlock>
          <InfoBlock color={COLOR_LAYOUT_GRAY}>{errorCount}</InfoBlock>
        </WordStatistic>
      </WrapperIconWithStatistic>
    </Container>
  );
};
