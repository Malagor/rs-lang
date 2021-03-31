import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import { FullScreenWrapperFlexCenter } from 'styles';
import { Word } from 'types';
import { database } from 'services';
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

const COUNT_ANSWERS = 4;

const KEYS_ARRAY = Array(COUNT_ANSWERS)
  .fill(1)
  .map((_, i) => `${i + 1}`);

type AudioChallengeProps = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mixingArray = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

export const AudioChallenge: FC<AudioChallengeProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const page = useSelector(selectTextBookPage);

  // helpers
  // const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // about quiz
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrentWord] = useState(0);
  const [answersArray, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswer] = useState('-1');
  const [userAnswerIndex, setUserAnswer] = useState('-1');

  // statistics
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [chain, setChain] = useState(0);
  const [longerChain, setLongerChain] = useState(0);

  // finish
  const [isFinish, setFinish] = useState(false);

  // Set Title Page
  useEffect(() => {
    dispatch(setPageTitle('Audio challenge'));
  }, [dispatch]);

  // Correct Answer

  const handlerCorrectAnswer = useCallback(() => {
    setCorrectWords([...correctWords, words[current]]);
    setChain((prev) => prev + 1);
  }, [correctWords, words, current]);

  // Incorrect Answer

  const handlerIncorrectAnswer = useCallback(() => {
    setIncorrectWords([...incorrectWords, words[current]]);
    if (chain > longerChain) {
      setLongerChain(chain);
      setChain(0);
    }
  }, [chain, longerChain, incorrectWords, words, current]);

  // Next Question

  const answerHandler = useCallback(() => {
    setUserAnswer('-1');
    if (current === words.length - 1) setFinish(true);
    if (current < words.length) {
      setCurrentWord(current + 1);
    }
  }, [words, current]);

  // New Game

  const handlerNewGame = useCallback(() => {
    setCurrentWord(0);
    setFinish(false);
    setUserAnswer('-1');
    setCorrectAnswer('-1');
    setChain(0);
    setLongerChain(0);
    clearCorrectWords();
    clearIncorrectWords();
  }, []);

  // Finish Game

  const handleFinishGame = useCallback(() => {
    setLongerChain(chain);
  }, [chain]);

  // Keyboard listener

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key } = e;

      // select answer
      if (KEYS_ARRAY.includes(key)) {
        const index = `${parseInt(key, 10) - 1}`;
        setUserAnswer(index);

        if (index === correctAnswerIndex) {
          handlerCorrectAnswer();
        } else {
          handlerIncorrectAnswer();
        }
      }

      // next word
      if (key === ' ') {
        if (userAnswerIndex !== '-1' && buttonRef && buttonRef.current) {
          buttonRef.current.click();
        } else {
          setIncorrectWords([...incorrectWords, words[current]]);
          setUserAnswer(correctAnswerIndex);
        }
      }
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [
    incorrectWords,
    correctWords,
    current,
    words,
    setUserAnswer,
    userAnswerIndex,
    correctAnswerIndex,
    handlerCorrectAnswer,
    handlerIncorrectAnswer,
  ]);

  // Load Words

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
  }, [group, page, userId]);

  useEffect(() => {
    if (words && words[current]) {
      const curWord = words[current].wordTranslate;
      const mixAnswers = mixingArray(['сдача', 'рассвет', 'стол', curWord]);
      const corAnswerIndex = mixAnswers.indexOf(words[current].wordTranslate);

      setAnswers(mixAnswers);
      setCorrectAnswer(corAnswerIndex.toString());
    }
  }, [words, current]);

  useEffect(() => {
    handleFinishGame();
  }, [isFinish, handleFinishGame]);

  const hasContent = words.length && words[current];

  return (
    <Container style={{ height: '100%' }} ref={containerRef}>
      <FullScreenWrapperFlexCenter>
        <AudioWrapper>
          <ProgressBar
            group={group}
            totalCount={words.length}
            current={current}
          />
          <FullScreenButton />
          {hasContent ? (
            <>
              <AudioCard
                word={words[current]}
                variants={answersArray}
                correctIndex={correctAnswerIndex}
                onUserAnswer={setUserAnswer}
                userChoice={userAnswerIndex}
              />
              <NextButton
                clickHandler={answerHandler}
                label={userAnswerIndex ? 'next word' : 'i don`t know'}
                buttonRef={buttonRef}
              />
            </>
          ) : null}
          {isFinish && (
            <FinishGame
              onFinishGameHandler={handlerNewGame}
              buttonRef={buttonRef}
              correctWords={correctWords}
              incorrectWord={incorrectWords}
              longerChain={longerChain}
            />
          )}
        </AudioWrapper>
      </FullScreenWrapperFlexCenter>
    </Container>
  );
};
