import React, { FC, useEffect, useRef, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
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

export const Sprint: FC<GamesProps> = () => {
  const [gamePage, setGamePage] = useState<TGamePages>(START_PAGE);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  /*   useEffect(() => {

  }, [gamePage]) */

  useEffect(() => {
    dispatch(setPageTitle('Sprint'));
  }, [dispatch]);
  const userId = useSelector(selectUserId);
  if (!userId) return <RedirectionModal />;

  return (
    <GameContainer ref={containerRef}>
      {gamePage === START_PAGE && <StartPage setGamePage={setGamePage} />}
      {gamePage === PLAY_PAGE && <PlayPage timeGame={TIME_GAME} />}
      {gamePage === RESULTS_PAGE && <ResultsPage />}
      Sprint
    </GameContainer>
  );
};
