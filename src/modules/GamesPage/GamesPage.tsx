import React, { FC, useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { WordsSource } from 'appConstants';
import { gamesData } from 'appConstants/games';
import { setGameWords, setGameWordsKind } from 'modules/TextBookPage/actions';
import { selectIsLoading } from 'modules/TextBookPage/selectors';
import { Loader } from 'components';
import { ChosenGameProps } from 'types';
import { GameCard, ChooseDifficulty } from './components';
import { useStyles } from './styled';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const [chosenGame, setChosenGame] = useState<ChosenGameProps | null>(null);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Games'));
    dispatch(setGameWordsKind(WordsSource.FROM_MENU));
    dispatch(setGameWords([]));
  }, [dispatch]);

  const classes = useStyles();

  return (
    <>
      {!chosenGame && (
        <Container>
          <Grid
            container
            item
            xs={12}
            justify="center"
            className={classes.wrapper}
          >
            {gamesData.map(({ name, img, description, link, color }) => (
              <GameCard
                key={name}
                img={img}
                name={name}
                description={description}
                link={link}
                colorButton={color}
                setChosenGame={setChosenGame}
              />
            ))}
          </Grid>
        </Container>
      )}
      {chosenGame && (
        <ChooseDifficulty
          chosenGame={chosenGame}
          setChosenGame={setChosenGame}
        />
      )}
      {isLoading && (
        <div style={{ zIndex: 10 }}>
          <Loader fixed />
        </div>
      )}
    </>
  );
};
