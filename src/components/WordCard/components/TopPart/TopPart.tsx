import React, { useRef } from 'react';
import { SERVER_URL } from 'appConstants';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { Word } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import StopIcon from '@material-ui/icons/Stop';
import { useTheme } from '@material-ui/core';
import { setPlayedSound, setSound } from 'modules/TextBookPage/actions';
import { selectUser } from 'modules/Login/selectors';
import {
  selectPlayedSound,
  selectTextBookSounds,
} from 'modules/TextBookPage/selectors';
import {
  EnglishWord,
  WordBlock,
  WordTranscription,
  WordTranslate,
  WordStatistic,
  InfoBlock,
  Container,
  WrapperIconWithStatistic,
  EnglishBlock,
} from './styled';

export type WordCardProps = {
  word: Word;
  colorGroup: string;
  successCount: number;
  errorCount: number;
  isTranslationShown: boolean;
};

export const TopPart: React.FC<WordCardProps> = ({
  word,
  colorGroup,
  successCount,
  errorCount,
  isTranslationShown,
}) => {
  const refAudioWord = useRef<HTMLAudioElement>(null);
  const refAudioMeaning = useRef<HTMLAudioElement>(null);
  const refAudioExample = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const sounds: HTMLAudioElement[] = useSelector(selectTextBookSounds);
  const playedSound = useSelector(selectPlayedSound);

  const user = useSelector(selectUser);
  const isLogin = !!user.id;

  const onPlay = () => {
    sounds.forEach((sound) => {
      sound.pause();
    });

    dispatch(setPlayedSound(word.word));

    const isSetSounds =
      refAudioWord.current &&
      refAudioMeaning.current &&
      refAudioExample.current;

    if (isSetSounds)
      dispatch(
        setSound([
          refAudioWord.current as HTMLAudioElement,
          refAudioMeaning.current as HTMLAudioElement,
          refAudioExample.current as HTMLAudioElement,
        ])
      );

    if (refAudioWord.current) {
      refAudioWord.current.currentTime = 0;
      refAudioWord.current.play();
      refAudioWord.current.onended = () => {
        if (refAudioMeaning.current) refAudioMeaning.current.currentTime = 0;
        refAudioMeaning.current && refAudioMeaning.current.play();
      };
    }

    if (refAudioMeaning.current) {
      refAudioMeaning.current.onended = () => {
        if (refAudioExample.current) refAudioExample.current.currentTime = 0;
        refAudioExample.current && refAudioExample.current.play();
      };
    }

    if (refAudioExample.current) {
      refAudioExample.current.onended = () => dispatch(setPlayedSound(''));
    }
  };

  const onStop = () => {
    if (refAudioWord.current) refAudioWord.current.pause();
    if (refAudioMeaning.current) refAudioMeaning.current.pause();
    if (refAudioExample.current) refAudioExample.current.pause();
    dispatch(setPlayedSound(''));
  };

  const iconStyles = { fontSize: '2rem', cursor: 'pointer' };

  return (
    <Container theme={theme}>
      <WordBlock colorGroup={colorGroup} theme={theme}>
        <EnglishBlock>
          <EnglishWord>{word.word}</EnglishWord>
          <WordTranscription>{word.transcription}</WordTranscription>
        </EnglishBlock>
        {isTranslationShown && (
          <WordTranslate>{word.wordTranslate}</WordTranslate>
        )}
      </WordBlock>

      <WrapperIconWithStatistic>
        {isLogin && (
          <WordStatistic>
            <InfoBlock color={colorGroup} title="Correct attempts">
              {successCount}
            </InfoBlock>
            <InfoBlock color={COLOR_LAYOUT_GRAY} title="Incorrect attempts">
              {errorCount}
            </InfoBlock>
          </WordStatistic>
        )}
        {playedSound === word.word ? (
          <StopIcon onClick={onStop} style={iconStyles} />
        ) : (
          <VolumeUpIcon onClick={onPlay} style={iconStyles} />
        )}
        <audio ref={refAudioWord} src={`${SERVER_URL}${word.audio}`}>
          <track kind="captions" />{' '}
        </audio>
        <audio ref={refAudioMeaning} src={`${SERVER_URL}${word.audioMeaning}`}>
          <track kind="captions" />{' '}
        </audio>
        <audio ref={refAudioExample} src={`${SERVER_URL}${word.audioExample}`}>
          <track kind="captions" />{' '}
        </audio>
      </WrapperIconWithStatistic>
    </Container>
  );
};
