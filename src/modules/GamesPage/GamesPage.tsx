import React, { FC, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { GameResults } from 'components';
import { selectWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();
  const words: Word[] = useSelector(selectWords);
  const rightlyAnswered = words.slice(0, 15);
  const wronglyAnswered = words.slice(15, 18);

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadWords(0, 0));
  }, [dispatch]);

  return (
    <Container style={{ position: 'relative', height: '100%' }}>
      <GameResults
        rightAnswers={20}
        wrongAnswers={3}
        rightlyAnswered={rightlyAnswered}
        wronglyAnswered={wronglyAnswered}
      />
    </Container>
  );
};
