import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { gamesData } from 'appConstants/games';
import { useTheme } from '@material-ui/core';
import { GameItem } from './components';
import { NavContainer } from './styled';

type GamesProps = {};

export const NavGame: FC<GamesProps> = () => {
  const theme = useTheme();

  return (
    <NavContainer theme={theme}>
      {gamesData.map((game) => (
        <NavLink to={game.link} key={game.name}>
          <GameItem img={game.img} name={game.name} />
        </NavLink>
      ))}
    </NavContainer>
  );
};
