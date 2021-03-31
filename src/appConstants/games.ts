import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';
import {
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARKBLUE,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_YELLOW,
} from './colors';

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: '/games/savannah',
    color: COLOR_LAYOUT_YELLOW,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: '/games/audio-challenge',
    color: COLOR_LAYOUT_ORANGE,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: '/games/sprint',
    color: COLOR_LAYOUT_BLUE,
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: '/games/own-game',
    color: COLOR_LAYOUT_DARKBLUE,
  },
];
