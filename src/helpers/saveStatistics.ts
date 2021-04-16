import { Word } from 'types';
import { LocStore } from 'services';
import { saveGameResults } from 'modules/GamesPage/saveGameResults';

export const saveStatistics = (option: {
  userId: string | null;
  gameName: string;
  rightlyAnswered: Word[];
  wronglyAnswered: Word[];
  maxInARow: number;
}) => {
  const {
    userId,
    gameName,
    rightlyAnswered,
    wronglyAnswered,
    maxInARow,
  } = option;
  if (!userId) {
    LocStore.updateGamesStatistics(
      gameName,
      rightlyAnswered,
      wronglyAnswered,
      maxInARow
    );
    LocStore.updateWordsStatistics(rightlyAnswered, wronglyAnswered);
  } else {
    saveGameResults({
      userId,
      game: gameName,
      rightlyAnswered,
      wronglyAnswered,
      maxInARow,
    });
  }
};
