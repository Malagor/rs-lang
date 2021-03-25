const USER = 'rslang-User';

export class LocStore {
  static setUser = (user: string) =>
    localStorage.setItem(USER, JSON.stringify(user));

  static getUser = () => {
    const authString = localStorage.getItem(USER);
    if (authString) {
      return JSON.parse(authString);
    }
    return null;
  };

  static deleteUser = () => {
    localStorage.removeItem(USER);
  };
}
