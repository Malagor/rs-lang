import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Word } from 'types';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookWords,
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
} from 'modules/TextBookPage/selectors';
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
  const [gamePoints, setGamePoints] = useState(0);
  const [isRightCase, setRightCase] = useState<boolean | null>(null);

  const [indexWordNow, setIndexWordNow] = useState<number | null>(null);
  const [gameArrayWorlds, setGameArrayWorlds] = useState<Word[]>([]);
  const [gameEnglishWord, setGameEnglishWord] = useState('');
  const [gameTranslatedWord, setGameTranslatedWord] = useState('');

  const words: Word[] = useSelector(selectTextBookWords);
  // const page = useSelector(selectTextBookPage);
  // const group = useSelector(selectTextBookGroup);
  const userId = useSelector(selectUserId);
  // const error = useSelector(selectTextBookError);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (words && indexWordNow) {
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
  }, [indexWordNow]);

  /*   const createGameWords = () => {
    const randomNumWord = getRandomIntInclusive(0, words.length - 1);
    setIndexWordNow(randomNumWord);
    setRightCase(Boolean(getRandomIntInclusive(-1, 0)));

    console.log('createGameWords__isRightCase', isRightCase);
    console.log('randomNumWord', indexWordNow);



    if (words && indexWordNow) {
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
  }; */

  useEffect(() => {
    setGameArrayWorlds(words);
  }, [words]);

  const setNumNextWord = () => {
    const randomNumWord = getRandomIntInclusive(0, words.length - 1);
    setIndexWordNow(randomNumWord);
    setRightCase(Boolean(getRandomIntInclusive(-1, 0)));
  };

  useEffect(() => {
    dispatch(setPageTitle('Sprint'));
  }, [dispatch]);

  if (!userId) return <RedirectionModal />;

  return (
    <GameContainer ref={containerRef}>
      {gamePage === START_PAGE && <StartPage setGamePage={setGamePage} />}
      {gamePage === PLAY_PAGE && (
        <PlayPage
          timeGame={TIME_GAME}
          setGamePage={setGamePage}
          gamePoints={gamePoints}
          setGamePoints={setGamePoints}
          isRightCase={isRightCase}
          gameEnglishWord={gameEnglishWord}
          gameTranslatedWord={gameTranslatedWord}
          setNumNextWord={setNumNextWord}
        />
      )}
      {gamePage === RESULTS_PAGE && <ResultsPage />}
      Sprint
    </GameContainer>
  );
};
