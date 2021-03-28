import React, { FC, useEffect } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import { gamesData } from 'appConstants/games';
import { GameCard } from './components';
import { useStyles } from './styled';

type GamesProps = {};

export const GamesPage: FC<GamesProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Games'));
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Container>
      <Grid container item xs={12} className={classes.wrapper}>
        {gamesData.map(({ name, img, description, link, colorButton }) => (
          <GameCard
            key={name}
            img={img}
            name={name}
            description={description}
            link={link}
            colorButton={colorButton}
          />
        ))}
      </Grid>
    </Container>
  );
};
