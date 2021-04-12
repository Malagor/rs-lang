export const APP_NAME = 'RSLang';
export const SERVER_URL = 'https://rs-lang-react.herokuapp.com/';

export const LOADER_BLOCK_SIZE = 25;
export const MOBILE_WIDTH = 1140;
export const DRAWER_WIDTH = 240;
export const COUNT_GROUPS = 6;
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_WORDS_TO_PLAY = 10;

export const API_CLOUDINARY =
  'https://api.cloudinary.com/v1_1/rs-lang/image/upload';

export const AUTHORS = [
  {
    name: 'Malagor',
    gitHub: 'https://github.com/Malagor',
  },

  {
    name: 'Femiarkh',
    gitHub: 'https://github.com/femiarkh',
  },
  {
    name: 'Andrei107Q',
    gitHub: 'https://github.com/Andrei107Q',
  },
  {
    name: 'Liza-Veis',
    gitHub: 'https://github.com/Liza-Veis',
  },
  {
    name: 'Vadim-Bykov',
    gitHub: 'https://github.com/Vadim-Bykov',
  },
];

export const DICTIONARY_TOPICS = [
  'Learning words',
  'Difficult words',
  'Deleted words',
];

export const LEARNING_SECTION = 'usual';
export const DIFFICULT_SECTION = 'difficult';
export const DELETED_SECTION = 'deleted';

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
