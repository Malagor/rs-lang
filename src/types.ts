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

export type DifficultyType = 'hard' | 'easy';

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

export type StateTextBook = {
  group: number;
  page: number;
  words: Word[];
  sounds: HTMLAudioElement[];
  error?: ErrorType | null;
  playedSound: string;
};

export type StateCommon = {
  title: string;
};

export type StateLogin = {
  user: User;
  auth: Auth;
};

export type StateMainPage = {};

export type State = {
  textBookReducer: StateTextBook;
  commonReducer: StateCommon;
  loginReducer: StateLogin;
};

export type GameStatistics = {
  wordsStudied: number;
  accuracy: number;
  maxInARow: number;
};
