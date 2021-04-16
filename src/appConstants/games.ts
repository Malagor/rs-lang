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
  SAVANNAH_BACKGROUND,
  AUDIO_CHALLENGE_BACKGROUND,
  SPRINT_BACKGROUND,
  IMAGINARIUM_BACKGROUND,
  IMAGINARIUM_STRONG_COLOR,
} from './colors';

export const COUNT_ANSWERS = 4;
export const SAVANNAH_LIVES = 5;
export const SAVANNAH_FIELD_SIZE = 500;

export const SPRINT_TIME_GAME = 60;

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: URL_GAME_SAVANNA,
    description:
      'Try to raise a savannah plant by watering it with you knowledge. Be quick though, as time for thinking is limited.',
    color: COLOR_LAYOUT_YELLOW,
    background: SAVANNAH_BACKGROUND,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: URL_GAME_AUDIO_CHALLENGE,
    description:
      'Check your listening skills, trying to pick the right meaning after hearing a word. Be careful, as you just have one guess. ',
    color: COLOR_LAYOUT_ORANGE,
    background: AUDIO_CHALLENGE_BACKGROUND,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: URL_GAME_SPRINT,
    description:
      'Check how much points you can get in one minute, making educated guesses about what is right and what is wrong.',
    color: COLOR_LAYOUT_BLUE,
    background: SPRINT_BACKGROUND,
  },
  {
    name: 'Imaginarium',
    img: IMAGINARIUM_ICON,
    link: URL_GAME_IMAGINARIUM,
    description:
      'Enhance your remembering by using visual memory and building strong connections right in your head.',
    color: COLOR_LAYOUT_DARKBLUE,
    background: IMAGINARIUM_BACKGROUND,
    strongColor: IMAGINARIUM_STRONG_COLOR,
  },
];
