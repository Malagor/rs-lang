import { Auth, User, Word } from 'types';

type UserWordType = {
  difficulty: string;
  optional?: { [key: string]: unknown };
};

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
    }).then((data) => data.json());
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
    word: UserWordType;
  }) => {
    const { userId, wordId, word } = option;

    const url = `${this.URL}/users/${userId}/words/${wordId}`;
    const rawResponse = await fetch(url, {
      method: 'POST',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
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
}

export const database = MongoDatabase.create();
