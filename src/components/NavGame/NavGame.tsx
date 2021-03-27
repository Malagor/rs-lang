import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AUDIO_CHALLENGE_ICON,
  gameNames,
  gamesData,
  OWN_GAME_ICON,
  SAVANNAH_ICON,
  SPRINT_ICON,
} from 'appConstants/games';
import { useTheme } from '@material-ui/core';
import { GameItem } from './components';
import { NavContainer, Flex } from './styled';

type GamesProps = {};

export const NavGame: FC<GamesProps> = () => {
  const [savannah, audioChallenge, sprint, ownGame] = gameNames;

  const theme = useTheme();

  const gameItems = gamesData.map((game) => (
    <NavLink to={game.link} key={game.name}>
      <GameItem img={game.img} name={game.name} />
    </NavLink>
  ));

  return (
    <NavContainer theme={theme}>
      {gameItems}
      {/* <Flex theme={theme}> */}
      {/* <NavLink to="/games/savannah">
        <GameItem img={SAVANNAH_ICON} name={savannah} />
      </NavLink>
      <NavLink to="/games/audioChallenge">
        <GameItem img={AUDIO_CHALLENGE_ICON} name={audioChallenge} />
      </NavLink> */}
      {/* </Flex> */}
      {/* <Flex theme={theme}> */}
      {/* <NavLink to="/games/sprint">
        <GameItem img={SPRINT_ICON} name={sprint} />
      </NavLink>
      <NavLink to="/games/ownGame">
        <GameItem lastItem={true} img={OWN_GAME_ICON} name={ownGame} />
      </NavLink> */}
      {/* </Flex> */}
    </NavContainer>
  );
};
