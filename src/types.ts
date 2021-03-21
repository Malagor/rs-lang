export type User = {
  id: string;
  name: string;
};

export type StateMainPage = {
  user: User;
};

export type State = {
  mainPageReducer: StateMainPage;
};
