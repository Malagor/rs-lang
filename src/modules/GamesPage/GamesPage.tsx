import React, { FC, useEffect, useState } from 'react';
import { Container, Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { GameResults } from 'components';
import { selectWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { useHistory } from 'react-router-dom';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();
  const words: Word[] = useSelector(selectWords);
  const rightlyAnswered = words.slice(0, 15);
  const wronglyAnswered = words.slice(15, 18);
  const [isResultModalOpened, setResultModalOpened] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadWords(0, 0));
  }, [dispatch]);

  const redirectAfterModalClose = () => {
    history.push('/');
  };

  return (
    <Container
      style={{
        position: 'relative',
        height: '100%',
        background: 'linear-gradient(180deg, #7F53AC 0%, #647DEE 100%)',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setResultModalOpened(true)}
      >
        Open Game Results
      </Button>
      {isResultModalOpened && (
        <GameResults
          rightAnswers={20}
          wrongAnswers={3}
          rightlyAnswered={rightlyAnswered}
          wronglyAnswered={wronglyAnswered}
          setOpened={setResultModalOpened}
          doAfterClose={redirectAfterModalClose}
        />
      )}
    </Container>
  );
};
