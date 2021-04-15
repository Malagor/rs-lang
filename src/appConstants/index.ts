import liza from 'assets/images/liza.jpg';
import vadim from 'assets/images/vadim.jpg';

export const APP_NAME = 'RSLang';
export const SERVER_URL = 'https://rs-lang-react.herokuapp.com/';

export const LOADER_BLOCK_SIZE = 25;
export const MOBILE_WIDTH = 1140;
export const DRAWER_WIDTH = 240;
export const COUNT_GROUPS = 6;
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_WORDS_TO_PLAY = 10;
export const WORDS_ON_EACH_PAGE = 20;
export const PAGES_IN_EACH_GROUP = 30;

export const API_CLOUDINARY =
  'https://api.cloudinary.com/v1_1/rs-lang/image/upload';

export const AUTHORS = [
  {
    name: 'Malagor',
    gitHub: 'https://github.com/Malagor',
    photo: 'https://avatars.githubusercontent.com/u/20399054?v=4',
    role: 'Team leader, Frontend developer',
    description:
      'Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend',
  },

  {
    name: 'Femiarkh',
    gitHub: 'https://github.com/femiarkh',
    photo: 'https://avatars.githubusercontent.com/u/55946100?v=4',
    role: 'Frontend developer',
    description:
      'Developed "Imaginarium" minigame, various common components for the minigames, and customized pagination. Hope you enjoy learning English with this app.',
  },
  {
    name: 'Andrei107Q',
    gitHub: 'https://github.com/Andrei107Q',
    photo: 'https://avatars.githubusercontent.com/u/58862645?v=4',
    role: 'Frontend developer',
    description:
      'Front-end developer, participated in the development of the registration form, the Sprint game and the group selector component',
  },
  {
    name: 'Liza-Veis',
    gitHub: 'https://github.com/Liza-Veis',
    photo: liza,
    role: 'Frontend developer, Designer',
    description:
      'Designed layout of the application, made main page and statistcs, made games results saving to the server, helped to think throw the logic of an app',
  },
  {
    name: 'Vadim-Bykov',
    gitHub: 'https://github.com/Vadim-Bykov',
    photo: vadim,
    role: 'Frontend developer',
    description:
      'Conducted the development of the pages of the textbook and dictionary. Made a card for words, implemented textbook settings and output of word statistics in the dictionary',
  },
];

export const DICTIONARY_TOPICS = [
  'Learning words',
  'Difficult words',
  'Deleted words',
];

export const LEARNING_SECTION = 'learning';
export const DIFFICULT_SECTION = 'difficult';
export const DELETED_SECTION = 'deleted';

export const NORMAL_DIFFICULTY = 'normal';
export const HARD_DIFFICULTY = 'hard';
export const EASY_DIFFICULTY = 'easy';

// eslint-disable-next-line @typescript-eslint/comma-dangle
export enum WordsSource {
  FROM_MENU = 'from menu',
  FROM_TEXTBOOK = 'from textbook',
  FROM_LEARNING = 'from learning',
  FROM_DIFFICULT = 'from difficult',
  FROM_DELETED = 'from deleted',
}
