import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gamesData } from 'appConstants/games';
import { useTheme } from '@material-ui/core';
import { Word } from 'types';
import { selectGameWords } from 'modules/TextBookPage/selectors';
import { GameItem } from './components';
import { NavContainer } from './styled';

type GamesProps = {};

export const NavGame: FC<GamesProps> = () => {
  const theme = useTheme();
  const gameWords: Word[] = useSelector(selectGameWords);
  const location = useLocation();

  return (
    <NavContainer theme={theme}>
      {gamesData.map((game) => (
        <NavLink
          to={gameWords.length ? game.link : location.pathname}
          key={game.name}
        >
          <GameItem img={game.img} name={game.name} />
        </NavLink>
      ))}
    </NavContainer>
  );
};
