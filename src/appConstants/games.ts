import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import IMAGINARIUM_ICON from 'assets/icons/imaginarium.png';
import {
  URL_GAME_SAVANNA,
  URL_GAME_AUDIO_CHALLENGE,
  URL_GAME_SPRINT,
  URL_GAME_IMAGINARIUM,
} from 'appConstants/url';
import {
  COLOR_LAYOUT_YELLOW,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARKBLUE,
} from './colors';

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: URL_GAME_SAVANNA,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    colorButton: COLOR_LAYOUT_YELLOW,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: URL_GAME_AUDIO_CHALLENGE,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    colorButton: COLOR_LAYOUT_ORANGE,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: URL_GAME_SPRINT,
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.',
    colorButton: COLOR_LAYOUT_BLUE,
  },
  {
    name: 'Imaginarium',
    img: IMAGINARIUM_ICON,
    link: URL_GAME_IMAGINARIUM,
    description:
      'Enhance your remembering by using visual memory and building strong illustrative connections right in your head.',
    colorButton: COLOR_LAYOUT_DARKBLUE,
  },
];
