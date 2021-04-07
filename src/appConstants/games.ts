import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';
import {
  URL_GAME_SAVANNA,
  URL_GAME_AUDIO_CHALLENGE,
  URL_GAME_SPRINT,
  URL_GAME_OWN_GAME,
} from 'appConstants/url';
import {
  COLOR_LAYOUT_YELLOW,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARKBLUE,
  SAVANNAH_BACKGROUND,
  AUDIO_CHALLENGE_BACKGROUND,
  SPRINT_BACKGROUND,
  IMAGINARIUM_BACKGROUND,
} from './colors';

export const COUNT_ANSWERS = 4;

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: URL_GAME_SAVANNA,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    color: COLOR_LAYOUT_YELLOW,
    background: SAVANNAH_BACKGROUND,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: URL_GAME_AUDIO_CHALLENGE,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    color: COLOR_LAYOUT_ORANGE,
    background: AUDIO_CHALLENGE_BACKGROUND,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: URL_GAME_SPRINT,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    color: COLOR_LAYOUT_BLUE,
    background: SPRINT_BACKGROUND,
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: URL_GAME_OWN_GAME,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    background: IMAGINARIUM_BACKGROUND,
    color: COLOR_LAYOUT_DARKBLUE,
  },
];
