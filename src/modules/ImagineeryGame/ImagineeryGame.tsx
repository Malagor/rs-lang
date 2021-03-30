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
import { Countdown, Loader } from 'components';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useTheme } from '@material-ui/core/styles';
import {
  GameContainer,
  Dashboard,
  FullScreenButtonContainer,
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

export const ImagineeryGame = () => {
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
  const words: Word[] = useSelector(selectWords);
  const wordUrls = useMemo(
    () => words.map((word) => `${SERVER_URL}${word.image}`),
    [words]
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameFieldRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleImageClick = useCallback(
    (word: Word) => {
      if (!hasStarted && hasFinished) return;
      if (!quizWord) return;
      if (word.id === quizWord.id) {
        setRightAnswers(rightAnswers + 1);
        setRightlyAnswered([...rightlyAnswered, quizWord]);
      } else {
        setWrongAnswers(wrongAnswers + 1);
        setWronglyAnswered([...wronglyAnswered, quizWord]);
      }
      setRound(round + 1);
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
    ]
  );

  const handleCountdownEnd = (): [boolean, number] | void => {
    setWrongAnswers(wrongAnswers + 1);
    setWronglyAnswered([...wronglyAnswered, quizWord!]);
    setRound(round + 1);
    if (round < QUIZ_COUNT) {
      return [true, 0];
    }
    return undefined;
  };

  const handleFullScreenButtonClick = () => {
    const handleFullScreenOut = () => {
      if (document.fullscreenElement === null) {
        setFullScreen(false);
      }
    };
    if (containerRef && containerRef.current) {
      if (!isFullScreen) {
        containerRef.current.requestFullscreen().catch((err) => err);
        setFullScreen(true);
        document.addEventListener('fullscreenchange', handleFullScreenOut);
      } else {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenOut);
    };
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
    dispatch(loadWords(1, 3));
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
      console.log('game is finished');
    }
  }, [setFinished, round]);

  const wordImages = currentWords.map((word, index) => (
    <WordImageContainer key={word.id} number={index + 1}>
      <WordImage
        src={`${SERVER_URL}${word.image}`}
        alt={word.word}
        onClick={() => handleImageClick(word)}
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
            <FullScreenButtonContainer onClick={handleFullScreenButtonClick}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullScreenButtonContainer>
            <InitialCountdownContainer gameIsStarted={hasStarted}>
              <Countdown
                duration={INITIAL_COUNTDOWN_TIME}
                onComplete={() => setStarted(true)}
              />
            </InitialCountdownContainer>
            <AnswerStats>
              <WrongWord>Wrong:&nbsp;</WrongWord>
              {wrongAnswers}
            </AnswerStats>
            <CountdownContainer gameIsStarted={hasStarted}>
              <Countdown
                key={hasFinished ? -1 : round}
                duration={COUNTDOWN_TIME}
                onComplete={handleCountdownEnd}
                isPlaying={hasStarted && !hasFinished}
              />
            </CountdownContainer>
            <AnswerStats>
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
