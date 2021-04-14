import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectGameWords,
  selectGameWordsKind,
  selectTextBookGroup,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import { GameWordsKindType, Word } from 'types';
import { LocStore } from 'services';
import {
  FullscreenButton,
  GameResults,
  RoundProgressBar,
  SoundButton,
} from 'components';
import 'react-circular-progressbar/dist/styles.css';
import FinishSound from 'assets/sounds/finish.mp3';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import { saveGameResults } from 'modules/GamesPage/saveGameResults';
import { WordsSource } from 'appConstants';
import { COUNT_ANSWERS } from 'appConstants/games';
import { mixingArray } from 'helpers/mixingArray';
import { FullScreenWrapperFlexCenter } from 'styles';
import { AudioGameContainer, AudioWrapper } from './styled';
import { AudioCard, NextButton } from './components';

const KEYS_ARRAY = Array(COUNT_ANSWERS)
  .fill(1)
  .map((_, i) => i + 1);

// Component
export const AudioChallenge: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const gameWords: Word[] = useSelector(selectGameWords);
  const gameWordsKind: GameWordsKindType = useSelector(selectGameWordsKind);

  // helpers
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);

  // about quiz
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrentWord] = useState(0);
  const [answersArray, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswer] = useState(-1);
  const [userAnswerIndex, setUserAnswer] = useState(-1);

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

  // Play sound
  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch((err) => err);
      }
    },
    [isSoundOn]
  );

  const saveStatistics = useCallback(() => {
    if (!userId) {
      LocStore.updateGamesStatistics(
        'Audio challenge',
        correctWords,
        incorrectWords,
        longerChain
      );
      LocStore.updateWordsStatistics(correctWords, incorrectWords);
    } else {
      saveGameResults({
        userId,
        game: 'Audio challenge',
        rightlyAnswered: correctWords,
        wronglyAnswered: incorrectWords,
        maxInARow: longerChain,
      });
    }
  }, [userId, correctWords, incorrectWords, longerChain]);

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
    const mixArr = mixingArray(gameWords);
    setWords(mixArr);
    handlerNewGame();
  }, [handlerNewGame, gameWords]);

  // Correct Answer
  const handlerCorrectAnswer = useCallback(() => {
    setCorrectWords([...correctWords, words[current]]);
    setChain((prev) => prev + 1);
    playSound(CorrectSound);
  }, [correctWords, words, current, playSound]);

  // Incorrect Answer
  const handlerIncorrectAnswer = useCallback(() => {
    setIncorrectWords([...incorrectWords, words[current]]);
    if (chain > longerChain) {
      setLongerChain(chain);
    }
    setChain(0);
    playSound(WrongSound);
  }, [chain, longerChain, incorrectWords, words, current, playSound]);

  // Check Answer
  const checkAnswer = useCallback(
    (index: number) => {
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
      setCorrectAnswer(indexRightAnswer);
    }
  }, [words, current]);

  // Next Question
  const answerHandler = useCallback(() => {
    setUserAnswer(-1);
    if (current === words.length - 1) setFinish(true);
    if (current < words.length) {
      setCurrentWord(current + 1);
    }
  }, [words, current]);

  // Finish Game
  const handleFinishGame = useCallback(() => {
    if (isFinish) {
      setLongerChain(chain > longerChain ? chain : longerChain);
      setIsResultOpen(true);
      playSound(FinishSound);
      if (
        gameWordsKind === WordsSource.FROM_MENU ||
        gameWordsKind === WordsSource.FROM_DELETED
      ) {
        saveStatistics();
      }
    }
  }, [chain, longerChain, playSound, isFinish, saveStatistics, gameWordsKind]);

  const closeResultModal = useCallback(() => {
    history.push('/games');
  }, [history]);

  // Keyboard listener
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key, repeat } = e;
      const numKey = parseInt(key, 10);

      // select answer
      if (!repeat && KEYS_ARRAY.includes(numKey)) {
        if (isFinish) {
          return;
        }
        if (userAnswerIndex !== -1) {
          return;
        }

        const index = numKey - 1;
        setUserAnswer(index);
        checkAnswer(index);
      }

      // next word
      if (!repeat && key === ' ') {
        if (isFinish) {
          setWords(mixingArray(words));
          handlerNewGame();
        } else if (userAnswerIndex !== -1 && buttonRef && buttonRef.current) {
          buttonRef.current.click();
        } else {
          setIncorrectWords([...incorrectWords, words[current]]);
          setUserAnswer(correctAnswerIndex);
          playSound(WrongSound);
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
    playSound,
  ]);

  // Add Variants for Answers listener
  useEffect(() => {
    addVariantsAnswers();
  }, [addVariantsAnswers]);

  // Finish game listener
  useEffect(() => {
    handleFinishGame();
    // playSound(FinishSound);
  }, [isFinish, handleFinishGame, playSound]);

  const hasContent = words.length && words[current];

  return (
    <AudioGameContainer ref={containerRef}>
      <FullScreenWrapperFlexCenter>
        <AudioWrapper>
          {!isFinish && (
            <RoundProgressBar
              group={group}
              totalCount={words.length}
              current={current}
            />
          )}
          <SoundButton isSoundOn={isSoundOn} setSoundOn={setSoundOn} />
          <audio ref={soundRef}>
            <track kind="captions" />
          </audio>

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
                label={userAnswerIndex !== -1 ? 'next word' : 'i don`t know'}
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
    </AudioGameContainer>
  );
};
