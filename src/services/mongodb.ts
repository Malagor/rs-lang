import { Auth, User, UserWord, Word } from 'types';

class MongoDatabase {
  private readonly URL: string;

  private token: string;

  constructor() {
    // this.URL = 'http://localhost:3001';
    this.URL = 'https://rs-lang-react.herokuapp.com';
    this.token = '';
  }

  static create(): MongoDatabase {
    return new MongoDatabase();
  }

  setToken = (token: string): void => {
    this.token = token;
  };

  getUserById = async (id: string): Promise<User> => {
    const url = `${this.URL}/users/${id}`;
    return fetch(url, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    }).then((data) => {
      if (data.ok) {
        return data.json();
      }
      return null;
    });
  };

  createUser = async (user: User) => {
    const url = `${this.URL}/users`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((data) => data.json());
  };

  loginUser = async (user: {
    email: string;
    password: string;
  }): Promise<Auth> => {
    const url = `${this.URL}/signin`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((data) => data.json());
  };

  createUserWord = async (option: {
    userId: string;
    wordId: string;
    wordOptions: UserWord;
  }) => {
    const { userId, wordId, wordOptions } = option;

    const url = `${this.URL}/users/${userId}/words/${wordId}`;
    const rawResponse = await fetch(url, {
      method: 'POST',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordOptions),
    });
    return rawResponse.json();
  };

  updateUserWord = async (option: {
    userId: string;
    wordId: string;
    wordOptions: UserWord;
  }) => {
    const { userId, wordId, wordOptions } = option;

    const url = `${this.URL}/users/${userId}/words/${wordId}`;
    const rawResponse = await fetch(url, {
      method: 'PUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordOptions),
    });
    return rawResponse.json();
  };

  getUserWord = async (userId: string, wordId: string) => {
    const url = `${this.URL}/users/${userId}/words/${wordId}`;

    const rawResponse = await fetch(url, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    return rawResponse.json();
  };

  getWords = async (group: number = 0, page: number = 0): Promise<Word[]> => {
    const url = `${this.URL}/words?group=${group}&page=${page}`;

    return fetch(url).then((words) => words.json());
  };

  getUserAggregatedWord = async (
    userId: string,
    group: number = 0,
    page: number = 0,
    wordPerPage: number = 20,
    filter: string = '{}'
  ) => {
    const url = `${this.URL}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordPerPage}&filter=${filter}`;

    const rawResponse = await fetch(url, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    return rawResponse.json();
  };

  getUserDifficultWord = async (
    userId: string,
    group: number = 0,
    page: number = 0,
    wordPerPage: number = 20
  ) =>
    this.getUserAggregatedWord(
      userId,
      group,
      page,
      wordPerPage,
      '{"userWord.difficulty":"hard"}'
    );

  getUserDeletedWord = async (
    userId: string,
    group: number = 0,
    page: number = 0,
    wordPerPage: number = 20
  ) =>
    this.getUserAggregatedWord(
      userId,
      group,
      page,
      wordPerPage,
      '{"userWord.difficulty":"easy"}'
    );
}

export const database = MongoDatabase.create();
