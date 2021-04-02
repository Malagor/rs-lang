import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookWords,
  selectTextBookGroup,
  selectTextBookPage,
} from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Loader } from 'components';
import { useTheme } from '@material-ui/core/styles';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import FinishSound from 'assets/sounds/finish.mp3';
import { GameContainer, GameField, QuizWordContainer } from './styled';
import { Dashboard, WordImage } from './components';

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

export const Imaginarium = () => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const [hasStarted, setStarted] = useState(false);
  const [hasFinished, setFinished] = useState(false);
  const [isLoading, setLoading] = useState(true);
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

  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const wordUrls = useMemo(
    () => words.map((word) => `${SERVER_URL}${word.image}`),
    [words]
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameFieldRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);
  const quizWordRef = useRef(quizWord);
  const theme = useTheme();

  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch();
      }
    },
    [isSoundOn]
  );

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
        playSound(CorrectSound);
      } else {
        setWrongAnswers(wrongAnswers + 1);
        if (!wronglyAnswered.includes(quizWord)) {
          setWronglyAnswered([...wronglyAnswered, quizWord]);
        }
        setCurrentInARow(0);
        setWrongId(word.id);
        setRightId(quizWord.id);
        setAnimationIsPlaying(true);
        playSound(WrongSound);
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
      playSound,
    ]
  );

  const handleCountdownEnd = (): [boolean, number] | void => {
    setWrongAnswers(wrongAnswers + 1);
    setWronglyAnswered([...wronglyAnswered, quizWordRef.current!]);
    setWrongId(quizWordRef.current!.id);
    setAnimationIsPlaying(true);
    playSound(WrongSound);
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
    dispatch(loadWords(group, page));
  }, [dispatch, group, page]);

  useEffect(() => {
    dispatch(setPageTitle('Imaginarium'));
  }, [dispatch]);

  useEffect(() => {
    quizWordRef.current = quizWord;
  }, [quizWord]);

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
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = FinishSound;
        soundRef.current.play().catch((err) => err);
      }
    }
  }, [setFinished, round, isSoundOn]);

  const wordImages = currentWords.map((word, index) => (
    <WordImage
      key={word.id}
      word={word}
      index={index}
      rightId={rightId}
      wrongId={wrongId}
      ANIMATION_TIME={ANIMATION_TIME}
      handleImageClick={handleImageClick}
    />
  ));

  return (
    <GameContainer ref={containerRef} breakpoints={theme.breakpoints}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Dashboard
            isFullscreen={isFullScreen}
            setFullscreen={setFullScreen}
            isSoundOn={isSoundOn}
            setSoundOn={setSoundOn}
            containerRef={containerRef}
            hasStarted={hasStarted}
            setStarted={setStarted}
            hasFinished={hasFinished}
            initialCountdownTime={INITIAL_COUNTDOWN_TIME}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            round={round}
            countdownTime={COUNTDOWN_TIME}
            animationIsPlaying={animationIsPlaying}
            handleCountdownEnd={handleCountdownEnd}
          />
          <GameField ref={gameFieldRef} breakpoints={theme.breakpoints}>
            {wordImages}
            <QuizWordContainer breakpoints={theme.breakpoints}>
              {quizWord && quizWord.word}
            </QuizWordContainer>
          </GameField>
          <audio ref={soundRef}>
            <track kind="captions" />
          </audio>
        </>
      )}
    </GameContainer>
  );
};
