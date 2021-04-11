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

  const createGameWords = () => {
    const randomNumWord = getRandomIntInclusive(0, words.length - 1);
    setIndexWordNow(randomNumWord);
    setRightCase(Boolean(getRandomIntInclusive(-1, 0)));

    /*    console.log('randomNumWord', indexWordNow);
    console.log('randomNumWord', indexWordNow);
    console.log('isRightCase', isRightCase) */

    if (words) {
      setGameEnglishWord(words[randomNumWord].word);
      if (isRightCase) {
        setGameTranslatedWord(words[randomNumWord].wordTranslate);
      } else if (isRightCase !== null && !isRightCase) {
        const randomNumWordTranslate = () => {
          const numRandomWordTranslate = getRandomIntInclusive(
            0,
            words.length - 1
          );
          if (randomNumWord === numRandomWordTranslate) {
            randomNumWordTranslate();
          } else {
            setGameTranslatedWord(words[numRandomWordTranslate].wordTranslate);
          }
        };
        randomNumWordTranslate();
      }
    }
  };

  useEffect(() => {
    setGameArrayWorlds(words);
  }, [words]);

  /*   console.log('isRightCase', isRightCase);
  console.log('gameEnglishWord', gameEnglishWord);
  console.log('gameTranslatedWord', gameTranslatedWord); */

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
          createGameWords={createGameWords}
        />
      )}
      {gamePage === RESULTS_PAGE && <ResultsPage />}
      Sprint
    </GameContainer>
  );
};
