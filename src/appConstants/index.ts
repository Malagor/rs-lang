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
    photo:
      'https://i1.wp.com/alkiansgroup.com/wp-content/uploads/2018/11/male-placeholder-image.jpg?fit=1000%2C1000&ssl=1',
    role: 'backend developer',
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris. Elementum commodo adipiscing ',
  },

  {
    name: 'Femiarkh',
    gitHub: 'https://github.com/femiarkh',
    photo:
      'https://i1.wp.com/alkiansgroup.com/wp-content/uploads/2018/11/male-placeholder-image.jpg?fit=1000%2C1000&ssl=1',
    role: 'backend developer',
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris. Elementum commodo adipiscing ',
  },
  {
    name: 'Andrei107Q',
    gitHub: 'https://github.com/Andrei107Q',
    photo:
      'https://i1.wp.com/alkiansgroup.com/wp-content/uploads/2018/11/male-placeholder-image.jpg?fit=1000%2C1000&ssl=1',
    role: 'backend developer',
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris. Elementum commodo adipiscing ',
  },
  {
    name: 'Liza-Veis',
    gitHub: 'https://github.com/Liza-Veis',
    photo:
      'https://i1.wp.com/alkiansgroup.com/wp-content/uploads/2018/11/male-placeholder-image.jpg?fit=1000%2C1000&ssl=1',
    role: 'backend developer',
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris. Elementum commodo adipiscing ',
  },
  {
    name: 'Vadim-Bykov',
    gitHub: 'https://github.com/Vadim-Bykov',
    photo:
      'https://i1.wp.com/alkiansgroup.com/wp-content/uploads/2018/11/male-placeholder-image.jpg?fit=1000%2C1000&ssl=1',
    role: 'backend developer',
    description:
      'Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim mauris. Elementum commodo adipiscing ',
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
