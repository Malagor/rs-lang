import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';

export const gamesData = [
  {
    name: 'Savannah',
    img: SAVANNAH_ICON,
    link: '/games/savannah',
    background:
      'linear-gradient(180deg, #FF5F6D 0%, #FF8C6F 43.75%, #FFC371 100%)',
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: '/games/audio-challenge',
    background: 'linear-gradient(180deg, #185A9D 0%, #43CEA2 100%)',
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: '/games/sprint',
    background: 'linear-gradient(180deg, #7F53AC 0%, #647DEE 100%)',
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: '/games/own-game',
    background:
      'linear-gradient(180deg, #FF5F6D 0%, #FF8C6F 43.75%, #FFC371 100%)',
  },
];
