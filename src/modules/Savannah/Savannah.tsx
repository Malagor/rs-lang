import React, { FC, useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { GameResults } from 'components';
import { selectTextBookWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { useHistory } from 'react-router-dom';
import { SAVANNAH_BACKGROUND } from 'appConstants/colors';

type GamesProps = {};

export const Savannah: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  const words: Word[] = useSelector(selectTextBookWords);
  const rightlyAnswered = words.slice(0, 15);
  const wronglyAnswered = words.slice(15, 18);
  const [isResultModalOpened, setResultModalOpened] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(setPageTitle('Savannah'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadWords(0, 0));
  }, [dispatch]);

  const redirectAfterModalClose = () => {
    history.push('/');
  };

  const handlePlayAgain = () => {
    console.log('Start over');
  };

  return (
    <Container
      style={{
        position: 'relative',
        height: '100%',
        background: SAVANNAH_BACKGROUND,
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
          inARow={8}
          rightlyAnswered={rightlyAnswered}
          wronglyAnswered={wronglyAnswered}
          isOpened={isResultModalOpened}
          setOpened={setResultModalOpened}
          doAfterClose={redirectAfterModalClose}
          handlePlayAgain={handlePlayAgain}
        />
      )}
    </Container>
  );
};
