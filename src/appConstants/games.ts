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

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: URL_GAME_SAVANNA,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: URL_GAME_AUDIO_CHALLENGE,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: URL_GAME_SPRINT,
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: URL_GAME_OWN_GAME,
  },
];
