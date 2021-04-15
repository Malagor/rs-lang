import { WordsSource } from 'appConstants';

export type Auth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
};

export type DifficultyType = 'hard' | 'normal' | 'easy';

export type UserWord = {
  difficulty: DifficultyType;
  optional?: {
    statistics?: {
      correct: number;
      incorrect: number;
    };
  };
};

export type CreateUserWordType = {
  userId: string;
  wordId: string;
  wordOptions: UserWord;
};

export type Word = {
  id: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWord;
};

export type ErrorType = {
  stack?: string;
  message?: string;
};

export type WordSectionType = 'learning' | 'difficult' | 'deleted';

export type StateTextBook = {
  group: number;
  page: number;
  dictionaryGroup: number;
  dictionaryPage: number;
  words: Word[];
  gameWords: Word[];
  gameWordsKind: GameWordsKindType;
  sounds: HTMLAudioElement[];
  error?: ErrorType | null;
  playedSound: string;
  checkedDifficulties: DifficultyType[];
  pagesCount: number;
  wordSection: WordSectionType;
  isLoading: boolean;
  refStatistic: HTMLButtonElement | null;
  isTranslate: boolean;
  isButtons: boolean;
};

export type StateCommon = {
  title: string;
  isLoginModalOpen: boolean;
  isRegistrationModalOpen: boolean;
};

export type StateLogin = {
  user: User;
  auth: Auth;
  error: boolean;
  loading: boolean;
};

export type StateMainPage = {};

export type StateStatistics = {
  learnedWords: number;
  optional: {
    learnedWordsByDays: {
      [date: string]: number;
    };
    games: {
      [game: string]: GameStatistics;
    };
  };
  error: ErrorType | null;
  loading: boolean;
};

export type State = {
  textBookReducer: StateTextBook;
  commonReducer: StateCommon;
  loginReducer: StateLogin;
  statisticsReducer: StateStatistics;
};

export type GameStatistics = {
  wordsStudied: number;
  accuracy: number;
  maxInARow: number;
  date?: string;
};

export type Partial<T> = { [P in keyof T]?: T[P] };

export type GameWordsKindType =
  | WordsSource.FROM_MENU
  | WordsSource.FROM_TEXTBOOK
  | WordsSource.FROM_LEARNING
  | WordsSource.FROM_DIFFICULT
  | WordsSource.FROM_DELETED;

export type ChosenGameProps = {
  gameName: string;
  gameLink: string;
  gameColor: string;
};
