const USER = 'rslang-User';
const GROUP_PAGE = 'rslang-GroupPage';

const getDataLocalStorage = (nameField: string) => {
  const dataField = localStorage.getItem(nameField);
  return dataField ? JSON.parse(dataField) : null;
};

export class LocStore {
  static setUser = (user: string) =>
    localStorage.setItem(USER, JSON.stringify(user));

  static getUser = () => getDataLocalStorage(USER);

  static deleteUser = () => {
    localStorage.removeItem(USER);
  };

  static setNumberGroupPage = (numberGroupPage: number) => {
    localStorage.setItem(GROUP_PAGE, JSON.stringify(numberGroupPage));
  };

  static getNumberGroupPage = () => getDataLocalStorage(GROUP_PAGE);

  static deleteNumberGroupPage = () => localStorage.removeItem(GROUP_PAGE);
}
