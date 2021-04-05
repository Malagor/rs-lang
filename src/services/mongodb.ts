import { Auth, User, UserWord, Word } from 'types';
import { InitialStatistics } from 'modules/StatisticsPage/statisticsReducer';

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
    data: Partial<{
      userId: string;
      group: number;
      page: number;
      wordPerPage: number;
      filter: string;
    }>
  ) => {
    const { userId, group, page, wordPerPage, filter } = data;
    let url = `${this.URL}/users/${userId}/aggregatedWords`;

    const queries = [];
    if (group !== undefined) {
      queries.push(`group=${group}`);
    }
    if (page !== undefined) {
      queries.push(`page=${page}`);
    }
    if (wordPerPage !== undefined) {
      queries.push(`wordsPerPage=${wordPerPage}`);
    }
    if (filter !== undefined) {
      queries.push(`filter=${filter}`);
    }

    if (queries.length) {
      url += `?${queries.join('&')}`;
    }

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

    const { id, ...statistics } = (await rawResponse.json()) || {};

    return statistics;
  };

  updateUserStatistics = async (
    userId: string,
    data: typeof InitialStatistics
  ) => {
    const url = `${this.URL}/users/${userId}/statistics`;
    const { id, ...oldStatistics } =
      (await this.getUserStatistics(userId)) || {};
    const newStatistics = { ...oldStatistics, ...data };

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
