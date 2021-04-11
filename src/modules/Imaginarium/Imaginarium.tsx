import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { LocStore } from 'services/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookError,
  selectGameWords,
} from 'modules/TextBookPage/selectors';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { URL_GAMES } from 'appConstants/url';
import { Loader, GameResults, ErrorMessage } from 'components';
import { useTheme } from '@material-ui/core/styles';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import FinishSound from 'assets/sounds/finish.mp3';
import TickingSound from 'assets/sounds/ticking.mp3';
import { selectUserId } from 'modules/Login/selectors';
import { saveGameResults } from 'modules/GamesPage/saveGameResults';
import {
  GameContainer,
  GameField,
  PronounceButton,
  QuizWordContainer,
} from './styled';
import { Dashboard, WordImage, ModeChoosing } from './components';

const shuffle = (words: Word[]) =>
  words.slice().sort(() => Math.random() - 0.5);

const INITIAL_COUNTDOWN_TIME = 3;
const COUNTDOWN_TIME = 10;
const QUIZ_COUNT = 10;
const ANIMATION_TIME = 1200;

export const Imaginarium = () => {
  const [mode, setMode] = useState('');
  const [isModeChoosing, setModeChoosing] = useState(true);
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
  const [maxInARow, setMaxInARow] = useState(0);
  const [currentInARow, setCurrentInARow] = useState(0);
  const [rightWord, setRightWord] = useState('');
  const [wrongWord, setWrongWord] = useState('');
  const [animationIsPlaying, setAnimationIsPlaying] = useState(false);
  const [isResultsModalOpened, setResultsModalOpened] = useState(false);

  const gameWords: Word[] = useSelector(selectGameWords);
  const userId = useSelector(selectUserId);
  const error = useSelector(selectTextBookError);
  const wordImageUrls = useMemo(
    () => gameWords.map((word) => `${SERVER_URL}${word.image}`),
    [gameWords]
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameFieldRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);
  const pronunciationRef = useRef<HTMLAudioElement>(null);
  const quizWordRef = useRef(quizWord);
  const theme = useTheme();
  const history = useHistory();

  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch((err) => err);
      }
    },
    [isSoundOn]
  );

  const handleImageClick = useCallback(
    (word: Word) => {
      if (!hasStarted || hasFinished) return;
      if (!quizWord) return;
      if (animationIsPlaying) return;
      setAnimationIsPlaying(true);
      if (word.word === quizWord.word) {
        setRightlyAnswered([...rightlyAnswered, quizWord]);
        setCurrentInARow(currentInARow + 1);
        if (currentInARow + 1 > maxInARow) {
          setMaxInARow(currentInARow + 1);
        }
        setRightWord(word.word);

        playSound(CorrectSound);
      } else {
        setWronglyAnswered([...wronglyAnswered, quizWord]);
        setCurrentInARow(0);
        setWrongWord(word.word);
        setRightWord(quizWord.word);
        playSound(WrongSound);
      }
      setTimeout(() => {
        setRound(round + 1);
        setAnimationIsPlaying(false);
        setRightWord('');
        setWrongWord('');
      }, ANIMATION_TIME + 300);
    },
    [
      hasFinished,
      hasStarted,
      quizWord,
      rightlyAnswered,
      wronglyAnswered,
      round,
      currentInARow,
      maxInARow,
      playSound,
      animationIsPlaying,
    ]
  );

  const handleCountdownEnd = (): [boolean, number] | void => {
    setAnimationIsPlaying(true);
    setWronglyAnswered([...wronglyAnswered, quizWordRef.current!]);
    setWrongWord(quizWordRef.current!.id);
    playSound(WrongSound);
    setTimeout(() => {
      setWrongWord('');
      setAnimationIsPlaying(false);
      setRound(round + 1);
      if (round < QUIZ_COUNT) {
        return [true, 0];
      }
      return undefined;
    }, ANIMATION_TIME + 300);
  };

  const startOver = () => {
    setMode('');
    setModeChoosing(true);
    setStarted(false);
    setFinished(false);
    setRound(0);
    setCurrentWords([]);
    setRightlyAnswered([]);
    setWronglyAnswered([]);
    setQuizWord(null);
    setMaxInARow(0);
    setCurrentInARow(0);
    setRightWord('');
    setWrongWord('');
  };

  const pronounceQuizWord = useCallback(() => {
    if (pronunciationRef && pronunciationRef.current) {
      const quizWordAudio = `${SERVER_URL}${quizWord?.audio}`;
      pronunciationRef.current.src = quizWordAudio;
      pronunciationRef.current.play().catch((err) => err);
    }
  }, [quizWord?.audio]);

  useEffect(() => {
    if (mode === 'Sounds' && hasStarted && round !== QUIZ_COUNT) {
      pronounceQuizWord();
    }
  }, [pronounceQuizWord, hasStarted, mode, round]);

  useEffect(() => {
    if (!error && !isModeChoosing && !hasStarted && isSoundOn) {
      playSound(TickingSound);
    } else if (soundRef && soundRef.current && soundRef.current.play) {
      soundRef.current.pause();
    }
  }, [error, hasStarted, isModeChoosing, playSound, isSoundOn]);

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
    if (!gameWords) return;
    const preloadedImages = wordImageUrls.map((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      return img;
    });
    setImages(preloadedImages);
    if (images.length > 0) {
      setLoading(false);
    }
  }, [gameWords, wordImageUrls, images.length]);

  useEffect(() => {
    const randomWords = shuffle(gameWords).slice(0, 8);
    const randomWord = randomWords[Math.floor(Math.random() * 8)];
    setCurrentWords(randomWords);
    setQuizWord(randomWord);
  }, [setCurrentWords, setQuizWord, gameWords, round]);

  useEffect(() => {
    if (round === QUIZ_COUNT) {
      setFinished(true);
      setResultsModalOpened(true);
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = FinishSound;
        soundRef.current.play().catch((err) => err);
      }
      if (!userId) {
        LocStore.updateGamesStatistics(
          'Imaginarium',
          rightlyAnswered,
          wronglyAnswered,
          maxInARow
        );
        LocStore.updateWordsStatistics(rightlyAnswered, wronglyAnswered);
      } else {
        saveGameResults({
          userId,
          game: 'Imaginarium',
          rightlyAnswered,
          wronglyAnswered,
          maxInARow,
        });
      }
    }
  }, [
    setFinished,
    round,
    isSoundOn,
    maxInARow,
    rightlyAnswered,
    wronglyAnswered,
    userId,
  ]);

  const wordImages = currentWords.map((word, index) => (
    <WordImage
      key={word.word}
      word={word}
      index={index}
      rightWord={rightWord}
      wrongWord={wrongWord}
      ANIMATION_TIME={ANIMATION_TIME}
      handleImageClick={handleImageClick}
    />
  ));

  return (
    <GameContainer ref={containerRef}>
      {error && <ErrorMessage />}
      {!error && isModeChoosing && (
        <ModeChoosing setMode={setMode} setModeChoosing={setModeChoosing} />
      )}
      {!error && !isModeChoosing && isLoading && <Loader />}
      {!error && !isModeChoosing && !isLoading && !hasFinished && (
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
            rightAnswers={rightlyAnswered.length}
            wrongAnswers={wronglyAnswered.length}
            round={round}
            countdownTime={COUNTDOWN_TIME}
            animationIsPlaying={animationIsPlaying}
            handleCountdownEnd={handleCountdownEnd}
          />
          <GameField ref={gameFieldRef} breakpoints={theme.breakpoints}>
            {wordImages}
            <QuizWordContainer breakpoints={theme.breakpoints}>
              {mode === 'Letters' && quizWord && quizWord.word}
              {mode === 'Sounds' && (
                <PronounceButton onClick={pronounceQuizWord} />
              )}
            </QuizWordContainer>
          </GameField>
          <LinearProgress
            variant="determinate"
            value={(round / QUIZ_COUNT) * 100}
          />
        </>
      )}
      {hasFinished && (
        <GameResults
          isOpened={isResultsModalOpened}
          setOpened={setResultsModalOpened}
          inARow={maxInARow}
          rightlyAnswered={rightlyAnswered}
          wronglyAnswered={wronglyAnswered}
          handlePlayAgain={() => startOver()}
          doAfterClose={() => history.push(URL_GAMES)}
        />
      )}
      <audio ref={soundRef}>
        <track kind="captions" />
      </audio>
      <audio ref={pronunciationRef}>
        <track kind="captions" />
      </audio>
    </GameContainer>
  );
};
