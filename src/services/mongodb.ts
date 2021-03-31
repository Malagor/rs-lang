import { InitialStatistics } from 'modules/StatisticsPage/statisticsReducer';
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
    })
      .then((data) => data.json())
      .then((data) => {
        this.createUserStatistics(data.userId);
        return data;
      });
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

  deleteUserWord = async (option: { userId: string; wordId: string }) => {
    const { userId, wordId } = option;

    const url = `${this.URL}/users/${userId}/words/${wordId}`;
    await fetch(url, {
      method: 'DELETE',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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

  createUserStatistics = async (userId: string) => {
    const url = `${this.URL}/users/${userId}/statistics`;

    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(InitialStatistics),
    });
    return rawResponse;
  };

  getUserStatistics = async (userId: string) => {
    const url = `${this.URL}/users/${userId}/statistics`;

    const rawResponse: Response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.status === 404) {
        return this.createUserStatistics(userId);
      }
      return res;
    });

    const data = await rawResponse.json();
    delete data.id;

    return data;
  };

  updateUserStatistics = async (
    userId: string,
    data: typeof InitialStatistics
  ) => {
    const url = `${this.URL}/users/${userId}/statistics`;
    const oldStatistics = await this.getUserStatistics(userId);
    delete oldStatistics.id;
    const newStatistics = oldStatistics ? { ...oldStatistics, ...data } : data;

    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatistics),
    });
    return rawResponse.json();
  };
}

export const database = MongoDatabase.create();
