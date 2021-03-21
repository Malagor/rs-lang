import { User } from 'types';

class MongoDatabase {
  private readonly URL: string;

  constructor() {
    this.URL = 'http://localhost:3001';
    // this.URL = 'https://malagor-travel-app-47934.herokuapp.com';
  }

  static create(): MongoDatabase {
    return new MongoDatabase();
  }

  getUserInfo = async (id: string): Promise<User> =>
    fetch(`${this.URL}/user/${id}`).then((data) => data.json());

  createUser = async (id: string, name: string): Promise<User> => {
    const url = `${this.URL}/user`;
    const userData: User = {
      id,
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
}

export const database = MongoDatabase.create();
