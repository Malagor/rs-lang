import { GameStatistics, Word } from 'types';

const USER = 'rslang-User';
const GROUP_PAGE = 'rslang-GroupPage';
const GAMES_STATISTICS = 'rslang-GamesStatistics';
const WORDS_STATISTICS = 'rslang-WordsStatistics';
const TEXTBOOK_SETTINGS = 'rslang-TextbookSettings';

const getData = (nameField: string) => {
  const dataField = localStorage.getItem(nameField);
  return dataField ? JSON.parse(dataField) : null;
};

export class LocStore {
  static setUser = (user: string) =>
    localStorage.setItem(USER, JSON.stringify(user));

  static getUser = () => getData(USER);

  static deleteUser = () => {
    localStorage.removeItem(USER);
  };

  static setNumberGroupPage = (numberGroupPage: number) => {
    localStorage.setItem(GROUP_PAGE, JSON.stringify(numberGroupPage));
  };

  static getNumberGroupPage = () => getData(GROUP_PAGE);

  static deleteNumberGroupPage = () => localStorage.removeItem(GROUP_PAGE);

  static getTextBookSettings = () => getData(TEXTBOOK_SETTINGS);

  static setTextBookSettings = (settings: {
    isButtonsShown?: boolean;
    isTranslationShown?: boolean;
  }) => {
    const oldSettings = LocStore.getTextBookSettings();
    localStorage.setItem(
      TEXTBOOK_SETTINGS,
      JSON.stringify({ ...oldSettings, ...settings })
    );
  };

  static getGamesStatistics = () => getData(GAMES_STATISTICS);

  static updateGamesStatistics = (
    game: string,
    rightlyAnswered: Word[],
    wronglyAnswered: Word[],
    maxInARow: number
  ) => {
    const wordsStudied = rightlyAnswered.length + wronglyAnswered.length;
    const accuracy = Math.round((rightlyAnswered.length / wordsStudied) * 100);
    const statistics: GameStatistics = {
      wordsStudied,
      accuracy,
      maxInARow,
    };
    const date = new Date().toDateString();
    const currentGamesStatisticsString = localStorage.getItem(GAMES_STATISTICS);
    let currentGamesStatistics;
    if (currentGamesStatisticsString) {
      currentGamesStatistics = JSON.parse(currentGamesStatisticsString);
    }
    let newGamesStatistics;
    if (!currentGamesStatistics || !currentGamesStatistics[date]) {
      newGamesStatistics = {
        [date]: {
          [game]: statistics,
        },
      };
    } else if (!currentGamesStatistics[date][game]) {
      newGamesStatistics = {
        ...currentGamesStatistics,
        [date]: { ...currentGamesStatistics[date], [game]: statistics },
      };
    } else {
      const {
        wordsStudied: currentWordsStudied,
        accuracy: currentAccuracy,
        maxInARow: currentMaxInARow,
      } = currentGamesStatistics[date][game];
      const {
        wordsStudied: incomingWordsStudied,
        accuracy: incomingAccuracy,
        maxInARow: incomingMaxInARow,
      } = statistics;
      const updatedWordsStudied = currentWordsStudied + incomingWordsStudied;
      const updatedAccuracy = Math.round(
        (currentAccuracy + incomingAccuracy) / 2
      );
      const updatedMaxInARow = Math.max(currentMaxInARow, incomingMaxInARow);
      newGamesStatistics = {
        ...currentGamesStatistics,
        [date]: {
          ...currentGamesStatistics[date],
          [game]: {
            wordsStudied: updatedWordsStudied,
            accuracy: updatedAccuracy,
            maxInARow: updatedMaxInARow,
          },
        },
      };
    }
    localStorage.setItem(GAMES_STATISTICS, JSON.stringify(newGamesStatistics));
  };

  static getWordsStatistics = () => getData(WORDS_STATISTICS);

  static updateWordsStatistics = (
    rightlyAnswered: Word[],
    wronglyAnswered: Word[]
  ) => {
    const wordsStatisticsString = localStorage.getItem(WORDS_STATISTICS);
    const wordsStatistics = wordsStatisticsString
      ? JSON.parse(wordsStatisticsString)
      : {};
    rightlyAnswered.forEach((word) => {
      if (!wordsStatistics[word.id]) {
        wordsStatistics[word.id] = {
          correct: 0,
          incorrect: 0,
        };
      }
      wordsStatistics[word.id].correct += 1;
    });
    wronglyAnswered.forEach((word) => {
      if (!wordsStatistics[word.id]) {
        wordsStatistics[word.id] = {
          correct: 0,
          incorrect: 0,
        };
      }
      wordsStatistics[word.id].incorrect += 1;
    });
    localStorage.setItem(WORDS_STATISTICS, JSON.stringify(wordsStatistics));
  };
}
