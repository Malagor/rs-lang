export type User = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type StateMainPage = {
  user: User;
};

export type Word = {
  id: string;
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
};

export type StateTextBook = {
  group: number;
  page: number;
  words: Word[];
};

export type StateCommon = {
  title: string;
};

export type State = {
  mainPageReducer: StateMainPage;
  textBookReducer: StateTextBook;
  commonReducer: StateCommon;
};
