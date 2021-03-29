import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import {
  selectAudioCurrentWord,
  selectAudioFinish,
  selectAudioIsAnswer,
  selectAudioWords,
} from './selectors';
import {
  clearCorrectWords,
  clearIncorrectWords,
  loadAudioGameWords,
  setChain,
  setCurrentWord,
  setFinish,
  setIsAnswer,
  setLongerChain,
  setUserAnswer,
} from './actions';
import {
  AudioCard,
  FullScreenButton,
  ProgressBar,
  NextButton,
  FinishGame,
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

  const isAnswer = useSelector(selectAudioIsAnswer);
  const isFinish = useSelector(selectAudioFinish);
  const current = useSelector(selectAudioCurrentWord);
  // const userAnswer = useSelector(selectAudioUserAnswer);

  const [open, setOpen] = useState(false);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      const variants = ['1', '2', '3', '4', '5'];
      const { key } = e;
      if (variants.includes(key)) {
        dispatch(setUserAnswer(key));
        dispatch(setIsAnswer(true));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setPageTitle('Audio challenge'));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

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
    dispatch(setIsAnswer(false));

    // проверить на правильность
    // занести слово в нужный массив
    // если верно, то увеличить chain,
    // если НЕ верно то сравнить с longerChain и если она больше то заменить. и Сбросить chain в 0
    // проерить на Финиш
    // если НЕ финиш, то увеличить текущий индекс
    // сбросить флаг isAnswer

    if (current === words.length - 1) dispatch(setFinish(true));

    if (current < words.length) {
      dispatch(setCurrentWord(current + 1));
    }
    dispatch(setUserAnswer('1'));
  };

  const newGameHandler = () => {
    dispatch(setCurrentWord(0));
    dispatch(setIsAnswer(false));
    dispatch(setFinish(false));
    dispatch(setUserAnswer(''));
    dispatch(setChain(0));
    dispatch(setLongerChain(0));
    dispatch(clearCorrectWords());
    dispatch(clearIncorrectWords());
  };

  const handleChange = (e: SyntheticEvent) => {};

  const contStyle = {
    height: '100%',
  };
  const hasContent = words.length && words[current];

  return (
    <Container style={contStyle}>
      <AudioWrapper>
        <ProgressBar group={group} totalCount={words.length} />
        <FullScreenButton open={open} onOpen={fullScreenOpenHandler} />
        {hasContent ? (
          <>
            <AudioCard
              word={words[current]}
              variants={[
                `${words[current].wordTranslate}`,
                'Ответ 2',
                'Ответ 3',
                'Ответ 4',
              ]}
            />
            <NextButton
              clickHandler={answerHandler}
              label={isAnswer ? 'next word' : 'i don`t know'}
            />
          </>
        ) : null}
        {isFinish && <FinishGame onFinishGameHandler={newGameHandler} />}
      </AudioWrapper>
    </Container>
  );
};
