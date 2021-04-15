import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { selectUserId } from 'modules/Login/selectors';
import {
  selectGameWords,
  selectGameWordsKind,
  selectTextBookError,
  selectTextBookGroup,
} from 'modules/TextBookPage/selectors';
import { saveGameResults } from 'modules/GamesPage/saveGameResults';
import { InitialCountdownContainer } from 'modules/Imaginarium/components/Dashboard/styled';
import {
  Countdown,
  ErrorMessage,
  FullscreenButton,
  GameResults,
  Loader,
  NotEnoughWordsMessage,
  RoundProgressBar,
  SoundButton,
} from 'components';
import { GameWordsKindType, Word } from 'types';
import { LocStore } from 'services';
import { COUNT_ANSWERS, SAVANNAH_LIVES } from 'appConstants/games';
import 'react-circular-progressbar/dist/styles.css';
import { SAVANNAH_BACKGROUND } from 'appConstants/colors';
import FinishSound from 'assets/sounds/finish.mp3';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import plantAnimationData from 'assets/animations/growing-plant.json';
import lottie, { AnimationItem } from 'lottie-web';
import { mixingArray } from 'helpers/mixingArray';
import { WordsSource } from 'appConstants';
import { FullScreenWrapperFlexCenter } from 'styles';
import { SavannahCard, Lives } from './components';
import {
  SavannahWrapper,
  GameContainer,
  PlantAnimation,
  PlantContainer,
} from './styled';

const KEYS_ARRAY = Array(COUNT_ANSWERS)
  .fill(1)
  .map((_, i) => i + 1);

const MAX_ANIMATION_TIME = 100;
const MIN_WORDS_FOR_PLAY = 6;
const INITIAL_COUNTDOWN_TIME = 3;

// Component
export const Savannah: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Selectors
  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const gameWordsKind: GameWordsKindType = useSelector(selectGameWordsKind);
  const gameWords: Word[] = useSelector(selectGameWords);

  // helpers
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const [plantGrow, setPlantGrow] = useState(0);
  const [notEnoughWords, setNotEnoughWords] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [hasStarted, setStarted] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const plantAnimationRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);
  const plant = useRef<AnimationItem>();

  // about quiz
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrentWord] = useState(0);
  const [answersArray, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswer] = useState(-1);
  const [userAnswerIndex, setUserAnswer] = useState(-1);
  const [lives, setLives] = useState(SAVANNAH_LIVES);
  const [finishRound, setFinishRound] = useState(false);
  // const [playAnimation, setPlayAnimation] = useState(false);

  // statistics
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [chain, setChain] = useState(0);
  const [longerChain, setLongerChain] = useState(0);

  // finish
  const [isFinish, setFinish] = useState(false);

  // Set Title Page
  useEffect(() => {
    dispatch(setPageTitle('Savannah'));
  }, [dispatch]);

  const grow = useCallback(() => {
    const step = MAX_ANIMATION_TIME / (words.length + 1);
    setPlantGrow((prev) =>
      prev + step < MAX_ANIMATION_TIME ? prev + step : MAX_ANIMATION_TIME
    );
  }, [words.length]);

  useEffect(() => {
    if (plantAnimationRef.current) {
      plant.current = lottie.loadAnimation({
        container: plantAnimationRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: plantAnimationData,
      });
    }
  }, []);

  useEffect(() => {
    if (plant.current) {
      plant.current.goToAndStop(plantGrow, true);
    }
  }, [plantGrow]);

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

  // New Game
  const handlerNewGame = useCallback(() => {
    setFinish(false);
    setCorrectWords([]);
    setIncorrectWords([]);
    setCurrentWord(0);
    setChain(0);
    setLongerChain(0);
    setIsResultOpen(false);
    setLives(SAVANNAH_LIVES);
    setPlantGrow(0);
  }, []);

  // Load Words
  useEffect(() => {
    const mixArr = mixingArray(gameWords);
    setWords(mixArr);
    setLoading(false);
    handlerNewGame();
  }, [handlerNewGame, gameWords]);

  // Check minimal count words
  useEffect(() => {
    if (gameWords.length < MIN_WORDS_FOR_PLAY) {
      setLoading(false);
      setNotEnoughWords(true);
    }
  }, [gameWords.length]);

  // Correct Answer
  const handlerCorrectAnswer = useCallback(() => {
    setCorrectWords([...correctWords, words[current]]);
    setChain((prev) => prev);
    playSound(CorrectSound);
    grow();
  }, [grow, correctWords, words, current, playSound]);

  // Incorrect Answer
  const handlerIncorrectAnswer = useCallback(() => {
    setIncorrectWords([...incorrectWords, words[current]]);
    if (chain > longerChain) {
      setLongerChain(chain);
    }
    setChain(0);
    playSound(WrongSound);
    setLives((l: number) => l - 1);
    if (lives - 1 <= 0) {
      setFinish(true);
    }
  }, [
    setFinish,
    lives,
    incorrectWords,
    chain,
    longerChain,
    words,
    current,
    playSound,
  ]);

  // Choice of answer variants
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

  // Next Round
  const nextRound = useCallback(() => {
    setUserAnswer(-1);
    if (current === words.length - 1) {
      setTimeout(() => {
        setFinish(true);
      }, 2000);
    }
    if (current < words.length) {
      setCurrentWord((prev) => prev + 1);
    }
  }, [words, current]);

  // Check Answer
  const checkAnswer = useCallback(
    (index: number) => {
      if (index === correctAnswerIndex) {
        handlerCorrectAnswer();
      } else {
        handlerIncorrectAnswer();
      }

      setUserAnswer(index);

      setTimeout(() => {
        nextRound();
      }, 2000);
    },
    [
      nextRound,
      correctAnswerIndex,
      handlerCorrectAnswer,
      handlerIncorrectAnswer,
    ]
  );

  // Save statistics
  const saveStatistics = useCallback(() => {
    if (userId) {
      saveGameResults({
        userId,
        game: 'Savannah',
        rightlyAnswered: correctWords,
        wronglyAnswered: incorrectWords,
        maxInARow: longerChain,
      });
    } else {
      LocStore.updateGamesStatistics(
        'Savannah',
        correctWords,
        incorrectWords,
        longerChain
      );
      LocStore.updateWordsStatistics(correctWords, incorrectWords);
    }
  }, [userId, longerChain, incorrectWords, correctWords]);

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
        return;
      }

      saveStatistics();
    }
  }, [saveStatistics, gameWordsKind, chain, longerChain, playSound, isFinish]);

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
        const index = numKey - 1;
        checkAnswer(index);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [checkAnswer, isFinish]);

  // Add Variants for Answers listener
  useEffect(() => {
    addVariantsAnswers();
  }, [addVariantsAnswers]);

  // Finish game listener
  useEffect(() => {
    if (lives <= 0 || isFinish) {
      setTimeout(() => {
        handleFinishGame();
      }, 1000);
    }
  }, [handleFinishGame, lives, isFinish]);

  const hasContent = words.length && words[current];

  return (
    <GameContainer background={SAVANNAH_BACKGROUND} ref={containerRef}>
      {error && <ErrorMessage />}
      {notEnoughWords && (
        <NotEnoughWordsMessage minWordsCount={MIN_WORDS_FOR_PLAY} />
      )}

      {!error && isLoading && <Loader />}

      <InitialCountdownContainer
        gameIsStarted={hasStarted}
        background={SAVANNAH_BACKGROUND}
      >
        <Countdown
          duration={INITIAL_COUNTDOWN_TIME}
          onComplete={() => setStarted(true)}
          strokeWidth={9}
          size={110}
        />
      </InitialCountdownContainer>

      <FullScreenWrapperFlexCenter>
        <SavannahWrapper>
          {!isFinish && (
            <RoundProgressBar
              group={group}
              totalCount={words.length}
              current={current}
            />
          )}
          <Lives lives={lives} />
          <SoundButton isSoundOn={isSoundOn} setSoundOn={setSoundOn} />
          <audio ref={soundRef}>
            <track kind="captions" />
          </audio>

          <FullscreenButton
            isFullscreen={isFullScreen}
            setFullscreen={setIsFullScreen}
            containerRef={containerRef}
          />
          {hasContent && !isFinish && hasStarted ? (
            <>
              <SavannahCard
                word={words[current]}
                variants={answersArray}
                correctIndex={correctAnswerIndex}
                userChoice={userAnswerIndex}
                onUserAnswer={checkAnswer}
                isFinishRound={finishRound}
                onFinishRound={setFinishRound}
              />
              <PlantContainer>
                <PlantAnimation
                  ref={plantAnimationRef}
                  style={{ transition: '0.3s' }}
                />
              </PlantContainer>
            </>
          ) : null}

          <PlantContainer>
            <PlantAnimation
              ref={plantAnimationRef}
              style={{ transition: '0.3s' }}
            />
          </PlantContainer>
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
        </SavannahWrapper>
      </FullScreenWrapperFlexCenter>
    </GameContainer>
  );
};
