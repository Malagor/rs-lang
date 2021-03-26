import React, { FC } from 'react';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';
import { NavLink } from 'react-router-dom';
import { gameNames } from 'appConstants/games';
import { useTheme } from '@material-ui/core';
import { GameItem } from './components/GameItem';
import { NavContainer, Flex } from './styled';

type GamesProps = {};

export const NavGame: FC<GamesProps> = () => {
  const [savannah, audioChallenge, sprint, ownGame] = gameNames;

  const theme = useTheme();

  return (
    <NavContainer theme={theme}>
      <Flex theme={theme}>
        <NavLink className="link" to="/games/savannah">
          <GameItem img={SAVANNAH_ICON} name={savannah} />
        </NavLink>
        <NavLink to="/games/audioChallenge">
          <GameItem img={AUDIO_CHALLENGE_ICON} name={audioChallenge} />
        </NavLink>
      </Flex>
      <Flex theme={theme}>
        <NavLink to="/games/sprint">
          <GameItem img={SPRINT_ICON} name={sprint} />
        </NavLink>
        <NavLink to="/games/ownGame">
          <GameItem lastItem={true} img={OWN_GAME_ICON} name={ownGame} />
        </NavLink>
      </Flex>
    </NavContainer>
  );
};
