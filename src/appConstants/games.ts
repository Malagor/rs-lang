import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';

export { SAVANNAH_ICON, AUDIO_CHALLENGE_ICON, SPRINT_ICON, OWN_GAME_ICON };

export const gameNames = ['Savannah', 'Audio challenge', 'Sprint', 'Own game'];

export const gamesData = [
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: '/games/audioChallenge',
  },
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: '/games/savannah',
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: '/games/sprint',
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: '/games/ownGame',
  },
];
