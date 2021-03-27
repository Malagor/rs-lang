import React, { FC, useEffect } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { gamesData } from 'appConstants/games';
import { GameCard } from './components';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  return (
    <Container>
      <Grid container item xs={12}>
        {gamesData.map((gameData) => (
          <GameCard
            key={gameData.name}
            img={gameData.img}
            name={gameData.name}
            description={gameData.description}
            link={gameData.link}
            colorButton={gameData.colorButton}
          />
        ))}
      </Grid>
    </Container>
  );
};
