import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { FullscreenButton, GameResults } from 'components';
import { COUNT_ANSWERS } from 'appConstants/games';
import 'react-circular-progressbar/dist/styles.css';
import { AUDIO_CHALLENGE_BACKGROUND } from 'appConstants/colors';
import { AudioWrapper } from './styled';
import { AudioCard, ProgressBar, NextButton } from './components';

const KEYS_ARRAY = Array(COUNT_ANSWERS)
  .fill(1)
  .map((_, i) => `${i + 1}`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mixingArray = (arr: any[]) => {
  const locArr = [...arr];
  locArr.sort(() => Math.random() - 0.5);
  return locArr;
};

// Component
export const AudioChallenge: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const page = useSelector(selectTextBookPage);

  // helpers
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
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

  // New Game
  const handlerNewGame = useCallback(() => {
    setFinish(false);
    setCorrectWords([]);
    setIncorrectWords([]);
    setCurrentWord(0);
    setChain(0);
    setLongerChain(0);
    setIsResultOpen(false);
  }, []);

  // Load Words
  useEffect(() => {
    let locWords: Promise<Word[]>;
    if (userId) {
      locWords = database
        .getUserAggregatedWord({
          userId,
          group,
          page,
          wordPerPage: 20,
          filter: `{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}`,
        })
        .then((data) => data[0].paginatedResults);
    } else {
      locWords = database.getWords(group, page);
    }

    locWords.then((data) => {
      const mixArr = mixingArray(data);
      setWords(mixArr);
    });
    handlerNewGame();
  }, [handlerNewGame, group, page, userId]);

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
    }
    setChain(0);
  }, [chain, longerChain, incorrectWords, words, current]);

  // Check Answer
  const checkAnswer = useCallback(
    (index: string) => {
      setUserAnswer(index);
      if (index === correctAnswerIndex) {
        handlerCorrectAnswer();
      } else {
        handlerIncorrectAnswer();
      }
    },
    [correctAnswerIndex, handlerCorrectAnswer, handlerIncorrectAnswer]
  );

  // Choice of answer options
  const addVariantsAnswers = useCallback(() => {
    if (words && words[current]) {
      let candidatesForAnswers: Word[] = mixingArray(words).splice(
        0,
        COUNT_ANSWERS
      );

      const indexCurrentWord = candidatesForAnswers.findIndex(
        (word: Word) => word.wordTranslate === words[current].wordTranslate
      );

      if (indexCurrentWord === -1) {
        candidatesForAnswers.splice(-1, 1, words[current]);
      } else {
        candidatesForAnswers.splice(indexCurrentWord, 1, words[current]);
      }

      candidatesForAnswers = mixingArray(candidatesForAnswers);

      const answer = candidatesForAnswers.map((word) => word.wordTranslate);
      const indexRightAnswer = answer.indexOf(words[current].wordTranslate);

      setAnswers(answer);
      setCorrectAnswer(indexRightAnswer.toString());
    }
  }, [words, current]);

  // Next Question
  const answerHandler = useCallback(() => {
    setUserAnswer('-1');
    if (current === words.length - 1) setFinish(true);
    if (current < words.length) {
      setCurrentWord(current + 1);
    }
  }, [words, current]);

  // Finish Game
  const handleFinishGame = useCallback(() => {
    setLongerChain(chain > longerChain ? chain : longerChain);
    setIsResultOpen(true);
  }, [chain, longerChain]);

  const closeResultModal = useCallback(() => {
    history.push('/games');
  }, [history]);

  // Keyboard listener
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key } = e;

      // select answer
      if (KEYS_ARRAY.includes(key)) {
        if (isFinish) {
          return;
        }
        const index = `${parseInt(key, 10) - 1}`;
        setUserAnswer(index);
        checkAnswer(index);
      }

      // next word
      if (key === ' ') {
        if (isFinish) {
          setWords(mixingArray(words));
          handlerNewGame();
        } else if (userAnswerIndex !== '-1' && buttonRef && buttonRef.current) {
          // setUserAnswer('-1');
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
    checkAnswer,
    isFinish,
    handlerNewGame,
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

  // Add Variants for Answers listener
  useEffect(() => {
    addVariantsAnswers();
  }, [addVariantsAnswers]);

  // Finish game listener
  useEffect(() => {
    handleFinishGame();
  }, [isFinish, handleFinishGame]);

  const hasContent = words.length && words[current];

  return (
    <Container
      style={{ height: '100%', backgroundImage: AUDIO_CHALLENGE_BACKGROUND }}
      ref={containerRef}
    >
      <FullScreenWrapperFlexCenter>
        <AudioWrapper>
          {!isFinish && (
            <ProgressBar
              group={group}
              totalCount={words.length}
              current={current}
            />
          )}
          <FullscreenButton
            isFullscreen={isFullScreen}
            setFullscreen={setIsFullScreen}
            containerRef={containerRef}
          />
          {hasContent ? (
            <>
              <AudioCard
                word={words[current]}
                variants={answersArray}
                correctIndex={correctAnswerIndex}
                onUserAnswer={checkAnswer}
                userChoice={userAnswerIndex}
              />
              <NextButton
                clickHandler={answerHandler}
                label={userAnswerIndex !== '-1' ? 'next word' : 'i don`t know'}
                buttonRef={buttonRef}
              />
            </>
          ) : null}
          {isResultOpen && isFinish && (
            <GameResults
              inARow={longerChain}
              rightlyAnswered={correctWords}
              wronglyAnswered={incorrectWords}
              isOpened={isResultOpen}
              setOpened={setIsResultOpen}
              handlePlayAgain={handlerNewGame}
              doAfterClose={closeResultModal}
            />
          )}
        </AudioWrapper>
      </FullScreenWrapperFlexCenter>
    </Container>
  );
};
