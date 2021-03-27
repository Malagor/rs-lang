import AUDIO_CHALLENGE_ICON from 'assets/icons/audio.png';
import SAVANNAH_ICON from 'assets/icons/savannah.png';
import SPRINT_ICON from 'assets/icons/sprint.png';
import OWN_GAME_ICON from 'assets/icons/ownGame.png';
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
    link: '/games/savannah',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae porro voluptatum illum corrupti. Cumque repellat architecto corrupti quis aliquam obcaecati dicta doloribus non eum. Dignissimos dolores maiores quidem. Non, aliquid.',
    colorButton: COLOR_LAYOUT_YELLOW,
  },
  {
    name: 'Audio challenge',
    img: AUDIO_CHALLENGE_ICON,
    link: '/games/audio-challenge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae porro voluptatum illum corrupti. Cumque repellat architecto corrupti quis aliquam obcaecati dicta doloribus non eum. Dignissimos dolores maiores quidem. Non, aliquid.',
    colorButton: COLOR_LAYOUT_ORANGE,
  },
  {
    name: 'Sprint',
    img: SPRINT_ICON,
    link: '/games/sprint',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae porro voluptatum illum corrupti. Cumque repellat architecto corrupti quis aliquam obcaecati dicta doloribus non eum. Dignissimos dolores maiores quidem. Non, aliquid.',
    colorButton: COLOR_LAYOUT_BLUE,
  },
  {
    name: 'Own game',
    img: OWN_GAME_ICON,
    link: '/games/own-game',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae porro voluptatum illum corrupti. Cumque repellat architecto corrupti quis aliquam obcaecati dicta doloribus non eum. Dignissimos dolores maiores quidem. Non, aliquid.',
    colorButton: COLOR_LAYOUT_DARKBLUE,
  },
];
