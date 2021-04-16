import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { GameWordsKindType, Word } from 'types';
import { URL_GAMES } from 'appConstants/url';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPageTitle } from 'store/commonState/actions';
import { GameResults, ErrorMessage, Countdown } from 'components';
import {
  selectTextBookGroup,
  selectTextBookError,
  selectGameWords,
  selectGameWordsKind,
} from 'modules/TextBookPage/selectors';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import FinishSound from 'assets/sounds/finish.mp3';
import { SPRINT_TIME_GAME } from 'appConstants/games';
import { selectUserId } from '../Login/selectors';
import { PlayPage } from './components';
import { GameContainer } from './styled';
import { WordsSource } from '../../appConstants';
import { saveStatistics } from '../../helpers/saveStatistics';
import { InitialCountdownContainer } from '../Imaginarium/components/Dashboard/styled';

type GamesProps = {};

const INITIAL_COUNTDOWN_TIME = 3;

const getRandomIntInclusive = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const Sprint: FC<GamesProps> = () => {
  const [hasStarted, setStarted] = useState(false);
  const [isFinishGame, setFinishGame] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  const [gamePoints, setGamePoints] = useState(0);
  const [preMultiplier, setPreMultiplier] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [maxInARow, setMaxInARow] = useState(0);
  const [currentInARow, setCurrentInARow] = useState(0);

  const [isRightCase, setRightCase] = useState<boolean | null>(null);

  const [indexWordNow, setIndexWordNow] = useState<number | null>(null);
  const [gameEnglishWord, setGameEnglishWord] = useState('');
  const [gameTranslatedWord, setGameTranslatedWord] = useState('');
  const [rightlyAnswered, setRightlyAnswered] = useState<Word[]>([]);
  const [wronglyAnswered, setWronglyAnswered] = useState<Word[]>([]);

  const [isResultsModalOpened, setResultsModalOpened] = useState(true);

  const words: Word[] = useSelector(selectGameWords);
  const gameWordsKind: GameWordsKindType = useSelector(selectGameWordsKind);
  const group = useSelector(selectTextBookGroup);
  const userId = useSelector(selectUserId);
  const error = useSelector(selectTextBookError);

  const history = useHistory();
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);

  const startOver = useCallback(() => {
    setFinishGame(false);
    setIndexWordNow(null);
    setGamePoints(0);
    setPreMultiplier(0);
    setMultiplier(1);
    setRightCase(null);
    setIndexWordNow(null);
    setMaxInARow(0);
  }, []);

  const rightMultiplierHandle = useCallback(() => {
    if (preMultiplier === 3) {
      setPreMultiplier(0);
      setMultiplier((prev) => prev + 1);
    } else {
      setPreMultiplier((prev) => prev + 1);
    }
  }, [preMultiplier]);

  const rightInARow = useCallback(() => {
    setCurrentInARow((prev) => prev + 1);
    if (currentInARow + 1 > maxInARow) {
      setMaxInARow((prev) => prev + 1);
    }
  }, [currentInARow, maxInARow]);

  useEffect(() => {
    if (isFinishGame) {
      if (
        gameWordsKind === WordsSource.FROM_MENU ||
        gameWordsKind === WordsSource.FROM_DELETED
      ) {
        return;
      }

      saveStatistics({
        gameName: 'Sprint',
        maxInARow,
        rightlyAnswered,
        userId,
        wronglyAnswered,
      });
    }
  }, [
    gameWordsKind,
    maxInARow,
    rightlyAnswered,
    wronglyAnswered,
    userId,
    isFinishGame,
  ]);

  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch((err) => err);
      }
    },
    [isSoundOn]
  );

  const handleAnswerButton = useCallback(
    (isCorrectAnswer: boolean) => {
      if (indexWordNow) {
        const quizWord = words[indexWordNow];

        if (isCorrectAnswer) {
          setRightlyAnswered([...rightlyAnswered, quizWord]);
          rightMultiplierHandle();
          rightInARow();
          playSound(CorrectSound);
        } else {
          setWronglyAnswered([...wronglyAnswered, quizWord]);
          setPreMultiplier(0);
          setCurrentInARow(0);
          playSound(WrongSound);
        }
      }
    },
    [
      indexWordNow,
      playSound,
      rightInARow,
      rightMultiplierHandle,
      rightlyAnswered,
      words,
      wronglyAnswered,
    ]
  );

  useEffect(() => {
    if (!error && words && indexWordNow) {
      setGameEnglishWord(words[indexWordNow].word);
      if (isRightCase) {
        setGameTranslatedWord(words[indexWordNow].wordTranslate);
      } else {
        const randomNumWordTranslate = () => {
          const numRandomWordTranslate = getRandomIntInclusive(
            0,
            words.length - 1
          );
          if (indexWordNow === numRandomWordTranslate) {
            randomNumWordTranslate();
          } else {
            setGameTranslatedWord(words[numRandomWordTranslate].wordTranslate);
          }
        };
        randomNumWordTranslate();
      }
    }
  }, [indexWordNow, error, words, isRightCase]);

  const setNumNextWord = useCallback(() => {
    const randomNumWord = getRandomIntInclusive(0, words.length - 1);
    setIndexWordNow(randomNumWord);
    setRightCase(Boolean(getRandomIntInclusive(-1, 0)));
  }, [words.length]);

  useEffect(() => {
    dispatch(setPageTitle('Sprint'));
  }, [dispatch]);

  return (
    <GameContainer ref={containerRef}>
      {error && <ErrorMessage />}
      <InitialCountdownContainer gameIsStarted={hasStarted}>
        <Countdown
          duration={INITIAL_COUNTDOWN_TIME}
          onComplete={() => setStarted(true)}
        />
      </InitialCountdownContainer>
      {!error && !isFinishGame && hasStarted && (
        <PlayPage
          isFullscreen={isFullScreen}
          setFullscreen={setFullScreen}
          isSoundOn={isSoundOn}
          setSoundOn={setSoundOn}
          containerRef={containerRef}
          timeGame={SPRINT_TIME_GAME}
          setFinish={setFinishGame}
          gamePoints={gamePoints}
          setGamePoints={setGamePoints}
          isRightCase={isRightCase}
          gameEnglishWord={gameEnglishWord}
          gameTranslatedWord={gameTranslatedWord}
          setNumNextWord={setNumNextWord}
          handleAnswerButton={handleAnswerButton}
          preMultiplier={preMultiplier}
          multiplier={multiplier}
          playFinishSound={() => playSound(FinishSound)}
        />
      )}
      {!error && isFinishGame && (
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
    </GameContainer>
  );
};
