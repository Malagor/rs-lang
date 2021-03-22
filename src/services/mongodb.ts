import { User, Word } from 'types';

class MongoDatabase {
  private readonly URL: string;

  constructor() {
    // this.URL = 'http://localhost:3001';
    this.URL = 'https://rs-lang-react.herokuapp.com';
  }

  static create(): MongoDatabase {
    return new MongoDatabase();
  }

  getUserInfo = async (id: string): Promise<User> =>
    fetch(`${this.URL}/user/${id}`).then((data) => data.json());

  createUser = async (id: string, name: string): Promise<User> => {
    const url = `${this.URL}/user`;
    const userData: User = {
      message: '',
      token: '',
      refreshToken: '',
      userId: id,
      name,
    };

    const body = JSON.stringify(userData);

    return fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  getWords = async (group: number = 0, page: number = 0): Promise<Word[]> => {
    const url = `${this.URL}/words?group=${group}&page=${page}`;

    return fetch(url).then((words) => words.json());
  };
}

export const database = MongoDatabase.create();
