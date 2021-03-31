import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Countdown, Loader, FullscreenButton } from 'components';
import { useTheme } from '@material-ui/core/styles';
import {
  GameContainer,
  Dashboard,
  AnswerStats,
  WrongWord,
  RightWord,
  InitialCountdownContainer,
  CountdownContainer,
  GameField,
  WordImage,
  QuizWordContainer,
  WordImageContainer,
} from './styled';

const shuffle = (words: Word[]) => {
  const arr = words;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const INITIAL_COUNTDOWN_TIME = 3;
const COUNTDOWN_TIME = 10;
const QUIZ_COUNT = 10;
const ANIMATION_TIME = 1200;

export const GameImaginarium = () => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [hasStarted, setStarted] = useState(false);
  const [hasFinished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [rightlyAnswered, setRightlyAnswered] = useState<Word[]>([]);
  const [wronglyAnswered, setWronglyAnswered] = useState<Word[]>([]);
  const [quizWord, setQuizWord] = useState<Word | null>(null);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [maxInARow, setMaxInARow] = useState(0);
  const [currentInARow, setCurrentInARow] = useState(0);
  const [rightId, setRightId] = useState('');
  const [wrongId, setWrongId] = useState('');
  const [animationIsPlaying, setAnimationIsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState<
    'small' | 'medium' | 'large' | null
  >(null);

  const words: Word[] = useSelector(selectWords);
  const wordUrls = useMemo(
    () => words.map((word) => `${SERVER_URL}${word.image}`),
    [words]
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameFieldRef = useRef<HTMLDivElement>(null);
  const quizWordRef = useRef(quizWord);
  const windowWidth = useRef(document.body.clientWidth);
  const theme = useTheme();
  const { md: mdWidth, sm: smWidth } = theme.breakpoints.values;

  const handleImageClick = useCallback(
    (word: Word) => {
      if (!hasStarted && hasFinished) return;
      if (!quizWord) return;
      if (word.id === quizWord.id) {
        setRightAnswers(rightAnswers + 1);
        if (!rightlyAnswered.includes(quizWord)) {
          setRightlyAnswered([...rightlyAnswered, quizWord]);
        }
        setCurrentInARow(currentInARow + 1);
        if (currentInARow + 1 > maxInARow) {
          setMaxInARow(currentInARow + 1);
        }
        setRightId(word.id);
        setAnimationIsPlaying(true);
      } else {
        setWrongAnswers(wrongAnswers + 1);
        if (!wronglyAnswered.includes(quizWord)) {
          setWronglyAnswered([...wronglyAnswered, quizWord]);
        }
        setCurrentInARow(0);
        setWrongId(word.id);
        setRightId(quizWord.id);
        setAnimationIsPlaying(true);
      }
      setTimeout(() => {
        setRound(round + 1);
        setAnimationIsPlaying(false);
        setRightId('');
        setWrongId('');
      }, ANIMATION_TIME + 300);
    },
    [
      hasFinished,
      hasStarted,
      quizWord,
      rightAnswers,
      rightlyAnswered,
      round,
      wrongAnswers,
      wronglyAnswered,
      currentInARow,
      maxInARow,
    ]
  );

  useEffect(() => {
    quizWordRef.current = quizWord;
  }, [quizWord]);

  const handleCountdownEnd = (): [boolean, number] | void => {
    setWrongAnswers(wrongAnswers + 1);
    setWronglyAnswered([...wronglyAnswered, quizWordRef.current!]);
    setWrongId(quizWordRef.current!.id);
    setAnimationIsPlaying(true);
    setTimeout(() => {
      setWrongId('');
      setAnimationIsPlaying(false);
      setRound(round + 1);
      if (round < QUIZ_COUNT) {
        return [true, 0];
      }
      return undefined;
    }, ANIMATION_TIME + 300);
  };

  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (!gameFieldRef || !gameFieldRef.current) return;
      if (![1, 2, 3, 4, 5, 6, 7, 8].includes(parseInt(evt.key, 10))) return;
      const index = parseInt(evt.key, 10) - 1;
      handleImageClick(currentWords[index]);
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [currentWords, handleImageClick]);

  useEffect(() => {
    dispatch(loadWords(2, 23));
  }, [dispatch]);

  useEffect(() => {
    if (!words) return;
    const preloadedImages = wordUrls.map((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      return img;
    });
    setImages(preloadedImages);
    if (images.length > 0) {
      setLoading(false);
    }
  }, [words, wordUrls, images.length]);

  useEffect(() => {
    const randomWords = shuffle(words).slice(0, 8);
    const randomWord = randomWords[Math.floor(Math.random() * 8)];
    setCurrentWords(randomWords);
    setQuizWord(randomWord);
  }, [setCurrentWords, setQuizWord, words, round]);

  useEffect(() => {
    if (round === QUIZ_COUNT) {
      setFinished(true);
      console.log('Game is finished.');
    }
  }, [setFinished, round]);

  const changeWindowSize = useCallback(() => {
    if (windowWidth.current < smWidth) {
      setWindowSize('small');
    } else if (windowWidth.current < mdWidth) {
      setWindowSize('medium');
    } else {
      setWindowSize('large');
    }
  }, [mdWidth, smWidth]);

  useEffect(() => {
    const handleResize = () => {
      windowWidth.current = document.body.clientWidth;
      changeWindowSize();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [changeWindowSize]);

  const wordImages = currentWords.map((word, index) => (
    <WordImageContainer key={word.id} number={index + 1} id={word.id}>
      <WordImage
        src={`${SERVER_URL}${word.image}`}
        alt={word.word}
        onClick={() => handleImageClick(word)}
        id={word.id}
        rightId={rightId}
        wrongId={wrongId}
        animationTime={ANIMATION_TIME}
      />
    </WordImageContainer>
  ));

  return (
    <GameContainer ref={containerRef} breakpoints={theme.breakpoints}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dashboard>
            <FullscreenButton
              isFullscreen={isFullScreen}
              setFullscreen={setFullScreen}
              containerRef={containerRef}
            />
            <InitialCountdownContainer gameIsStarted={hasStarted}>
              <Countdown
                duration={INITIAL_COUNTDOWN_TIME}
                onComplete={() => setStarted(true)}
              />
            </InitialCountdownContainer>
            <AnswerStats breakpoints={theme.breakpoints}>
              <WrongWord>Wrong:&nbsp;</WrongWord>
              {wrongAnswers}
            </AnswerStats>
            <CountdownContainer
              gameIsStarted={hasStarted}
              breakpoints={theme.breakpoints}
            >
              <Countdown
                key={hasFinished ? -1 : round}
                duration={COUNTDOWN_TIME}
                onComplete={handleCountdownEnd}
                size={pickTimerSize(windowSize)}
                strokeWidth={pickTimerSize(windowSize) / 10}
                isPlaying={hasStarted && !hasFinished && !animationIsPlaying}
              />
            </CountdownContainer>
            <AnswerStats breakpoints={theme.breakpoints}>
              <RightWord>Right:&nbsp;</RightWord>
              {rightAnswers}
            </AnswerStats>
          </Dashboard>
          <GameField ref={gameFieldRef} breakpoints={theme.breakpoints}>
            {wordImages}
            <QuizWordContainer breakpoints={theme.breakpoints}>
              {quizWord && quizWord.word}
            </QuizWordContainer>
          </GameField>
        </>
      )}
    </GameContainer>
  );
};

function pickTimerSize(windowWidth: string | null) {
  switch (windowWidth) {
    case 'small':
      return 60;
    case 'medium':
      return 80;
    default:
      return 100;
  }
}
