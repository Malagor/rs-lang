import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Word } from 'types';
import { URL_GAMES } from 'appConstants/url';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPageTitle } from 'store/commonState/actions';
import { GameResults, ErrorMessage } from 'components';
import {
  selectTextBookWords,
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
} from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import FinishSound from 'assets/sounds/finish.mp3';
import { LocStore } from 'services/localStorage';
import { saveGameResults } from 'modules/GamesPage/saveGameResults';
import { RedirectionModal } from '../../components/RedirectionModal';
import { selectUserId } from '../Login/selectors';
import { StartPage, PlayPage, ResultsPage } from './components';
import { GameContainer } from './styled';

type GamesProps = {};

export type TGamePages = 'startPage' | 'palyPage' | 'resultsPage';
export const START_PAGE = 'startPage';
export const PLAY_PAGE = 'palyPage';
export const RESULTS_PAGE = 'resultsPage';

const TIME_GAME = 60;

const getRandomIntInclusive = (min: number, max: number) => {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1; // Максимум и минимум включаются
};

export const Sprint: FC<GamesProps> = () => {
  const [gamePage, setGamePage] = useState<TGamePages>(START_PAGE);
  const [group, setGroup] = useState(useSelector(selectTextBookGroup));
  const [isSoundOn, setSoundOn] = useState(true);

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

  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const userId = useSelector(selectUserId);
  const error = useSelector(selectTextBookError);

  const history = useHistory();
  const dispatch = useDispatch();

  const soundRef = useRef<HTMLAudioElement>(null);

  const startOver = () => {
    setGamePage(PLAY_PAGE);
    setIndexWordNow(null);
    setGamePoints(0);
    setPreMultiplier(0);
    setMultiplier(1);
    setRightCase(null);
    setIndexWordNow(null);
    setMaxInARow(0);
  };

  const rightMultiplierHandle = () => {
    if (preMultiplier === 3) {
      setPreMultiplier(0);
      setMultiplier(multiplier + 1);
    } else {
      setPreMultiplier(preMultiplier + 1);
    }
  };

  const rightInARow = () => {
    setCurrentInARow(currentInARow + 1);
    if (currentInARow + 1 > maxInARow) {
      setMaxInARow(currentInARow + 1);
    }
  };

  useEffect(() => {
    if (gamePage === RESULTS_PAGE) {
      if (!userId) {
        LocStore.updateGamesStatistics(
          'Sprint',
          rightlyAnswered,
          wronglyAnswered,
          maxInARow
        );
        console.log('rightlyAnswered', rightlyAnswered);
        console.log(' wronglyAnswered', wronglyAnswered);
        LocStore.updateWordsStatistics(rightlyAnswered, wronglyAnswered);
      } /* else {
        saveGameResults({
          userId,
          game: 'Sprint',
          rightlyAnswered,
          wronglyAnswered,
          maxInARow,
        });
      } */
    }
  }, [rightlyAnswered, wronglyAnswered, userId, gamePage]);

  const handleAnswerButton = (answer: boolean) => {
    if (indexWordNow) {
      const quizWord = words[indexWordNow];

      if (answer) {
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
  };

  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch((err) => err);
      }
    },
    [isSoundOn]
  );

  const playFinishSound = () => playSound(FinishSound);

  useEffect(() => {
    dispatch(loadWords(group, page));
  }, [dispatch, group, page]);

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

  const setNumNextWord = () => {
    const randomNumWord = getRandomIntInclusive(0, words.length - 1);
    setIndexWordNow(randomNumWord);
    setRightCase(Boolean(getRandomIntInclusive(-1, 0)));
  };

  useEffect(() => {
    dispatch(setPageTitle('Sprint'));
  }, [dispatch]);

  return (
    <GameContainer>
      {error && <ErrorMessage />}
      {!error && gamePage === START_PAGE && (
        <StartPage
          setGamePage={setGamePage}
          setGroup={setGroup}
          group={group}
        />
      )}
      {!error && gamePage === PLAY_PAGE && (
        <PlayPage
          timeGame={TIME_GAME}
          setGamePage={setGamePage}
          gamePoints={gamePoints}
          setGamePoints={setGamePoints}
          isRightCase={isRightCase}
          gameEnglishWord={gameEnglishWord}
          gameTranslatedWord={gameTranslatedWord}
          setNumNextWord={setNumNextWord}
          handleAnswerButton={handleAnswerButton}
          preMultiplier={preMultiplier}
          multiplier={multiplier}
          playFinishSound={playFinishSound}
        />
      )}
      {!error && gamePage === RESULTS_PAGE && (
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
