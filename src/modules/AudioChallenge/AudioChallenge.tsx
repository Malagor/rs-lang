import React, { FC, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import { selectAudioWords } from './selectors';
import { loadAudioGameWords } from './actions';
import {
  AudioCard,
  FullScreenButton,
  ProgressBar,
  NextButton,
} from './components';
import 'react-circular-progressbar/dist/styles.css';
import { AudioWrapper } from './styled';

type AudioChallengeProps = {};

export const AudioChallenge: FC<AudioChallengeProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const page = useSelector(selectTextBookPage);
  const words = useSelector(selectAudioWords);

  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isFinish, setFinish] = useState(false);

  useEffect(() => {
    dispatch(setPageTitle('Audio challenge'));
  }, [dispatch]);

  useEffect(() => {
    console.log('Finish');
  }, [isFinish]);

  useEffect(() => {
    dispatch(
      loadAudioGameWords(
        userId,
        group,
        page,
        20,
        `{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}`
      )
    );
  }, [dispatch, group, page, userId]);

  const fullScreenOpenHandler = () => setOpen(!open);
  const answerHandler = () => {
    setIsAnswer(!isAnswer);
    if (current < words.length) setCurrent((cur) => cur + 1);
    if (current === words.length - 1) setFinish(true);
  };

  const contStyle = {
    height: '100%',
  };

  return (
    <Container style={contStyle}>
      <AudioWrapper>
        <ProgressBar
          group={group}
          totalCount={words.length}
          current={current}
        />
        <FullScreenButton open={open} onOpen={fullScreenOpenHandler} />
        {words.length ? (
          <AudioCard
            word={words[0]}
            answers={['Ответ 1', 'Ответ 2', 'Ответ 3', 'Ответ 4']}
          />
        ) : null}
        <NextButton isAnswer={isAnswer} onAnswer={answerHandler} />
      </AudioWrapper>
    </Container>
  );
};
