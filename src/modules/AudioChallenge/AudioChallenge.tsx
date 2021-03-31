import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
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
import { FullScreenWrapperFlexCenter } from 'styles';
import { clearCorrectWords, clearIncorrectWords } from './actions';
import {
  AudioCard,
  FullScreenButton,
  ProgressBar,
  NextButton,
  FinishGame,
} from './components';
import 'react-circular-progressbar/dist/styles.css';
import { AudioWrapper } from './styled';
import { Word } from '../../types';
import { database } from '../../services';

type AudioChallengeProps = {};

export const AudioChallenge: FC<AudioChallengeProps> = () => {
  const mixingArray = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (arr: any[]) => arr.sort(() => Math.random() - 0.5),
    []
  );

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const page = useSelector(selectTextBookPage);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);

  const [isAnswer, setIsAnswer] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [current, setCurrentWord] = useState(0);
  const [userAnswer, setUserAnswer] = useState(-1);

  // statistics
  const [chain, setChain] = useState(0);
  const [longerChain, setLongerChain] = useState(0);

  useEffect(() => {
    dispatch(setPageTitle('Audio challenge'));
  }, [dispatch]);

  useEffect(() => {
    console.log('Finish');
  }, [isFinish]);

  // Keyboard listener
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key } = e;

      // select answer
      if (['1', '2', '3', '4'].includes(key)) {
        setUserAnswer(parseInt(key, 10) - 1);
        setIsAnswer(true);
      }

      // next word
      if (key === ' ') {
        if (isAnswer && buttonRef && buttonRef.current) {
          buttonRef.current.click();
        } else {
          setIsAnswer(true);
        }
      }
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isAnswer]);

  useEffect(() => {
    const locWords = database.getUserAggregatedWord(
      userId,
      group,
      page,
      20,
      `{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}`
    );

    locWords.then((data) => {
      const mixArr = mixingArray(data[0].paginatedResults);
      setWords(mixArr);
    });
  }, [mixingArray, group, page, userId]);

  const answerHandler = () => {
    setIsAnswer(false);

    // проверить на правильность
    // занести слово в нужный массив
    // если верно, то увеличить chain,
    // если НЕ верно то сравнить с longerChain и если она больше то заменить. и Сбросить chain в 0
    // проерить на Финиш
    // если НЕ финиш, то увеличить текущий индекс
    // сбросить флаг isAnswer

    if (current === words.length - 1) setFinish(true);

    if (current < words.length) {
      setCurrentWord(current + 1);
    }
    // setUserAnswer('1');
  };

  useEffect(() => {
    if (words && words[current]) {
      const curCord = words[current].wordTranslate;
      const mixAnswers = mixingArray([
        'Ответ 1',
        'Ответ 2',
        'Ответ 3',
        curCord,
      ]);
      const corAnswerIndex = mixAnswers.indexOf(words[current].wordTranslate);

      setAnswers(mixAnswers);
      setCorrectAnswer(corAnswerIndex);
    }
  }, [words, mixingArray, current]);

  const newGameHandler = () => {
    setCurrentWord(0);
    setIsAnswer(false);
    setFinish(false);
    setUserAnswer(-1);
    setChain(0);
    setLongerChain(0);
    clearCorrectWords();
    clearIncorrectWords();
  };

  const handleChange = (e: SyntheticEvent) => {};

  const hasContent = words.length && words[current];

  return (
    <Container style={{ height: '100%' }}>
      <FullScreenWrapperFlexCenter>
        <AudioWrapper>
          <ProgressBar
            group={group}
            totalCount={words.length}
            current={current}
          />
          <FullScreenButton open={open} />
          {hasContent ? (
            <>
              <AudioCard
                word={words[current]}
                variants={answers}
                correctIndex={correctAnswer}
                onUserAnswer={setUserAnswer}
              />
              <NextButton
                clickHandler={answerHandler}
                label={isAnswer ? 'next word' : 'i don`t know'}
                buttonRef={buttonRef}
              />
            </>
          ) : null}
          {isFinish && (
            <FinishGame
              onFinishGameHandler={newGameHandler}
              buttonRef={buttonRef}
            />
          )}
        </AudioWrapper>
      </FullScreenWrapperFlexCenter>
    </Container>
  );
};
