import { updateStatisticsGames } from 'modules/StatisticsPage/actions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { database } from 'services';
import { store } from 'store';
import { StateStatistics, Word } from 'types';

type GameResultsProps = {
  userId: string;
  game: string;
  maxInARow: number;
  rightlyAnswered: Word[];
  wronglyAnswered: Word[];
};

const {
  dispatch,
}: { dispatch: ThunkDispatch<StateStatistics, void, AnyAction> } = store;

const updateWordStatistics = async (
  userId: string,
  words: Word[],
  option: 'correct' | 'incorrect'
) =>
  Promise.all(
    words.map(async (word: Word) => {
      // eslint-disable-next-line no-underscore-dangle
      const wordId = word._id || word.id;

      const userWord = await database.getUserWord(userId, wordId).catch(
        () => null
        //   database.createUserWord({
        //     userId,
        //     wordId,
        //     wordOptions: {
        //       difficulty: 'learning',
        //       optional: {
        //         statistics: {
        //           correct: 0,
        //           incorrect: 0,
        //         },
        //       },
        //     },
        //   })
      );

      if (!userWord) return Promise.resolve();

      const optional = userWord?.optional || {};
      const statistics = optional.statistics || {
        correct: 0,
        incorrect: 0,
      };

      return database.updateUserWord({
        userId,
        wordId,
        wordOptions: {
          difficulty: userWord?.difficulty,
          optional: {
            ...optional,
            statistics: {
              ...statistics,
              [option]: statistics[option] + 1,
            },
          },
        },
      });
    })
  );

export const saveGameResults = async ({
  userId,
  game,
  maxInARow,
  rightlyAnswered,
  wronglyAnswered,
}: GameResultsProps) => {
  const wordsStudied = rightlyAnswered.length + wronglyAnswered.length;
  const accuracy = Math.round((rightlyAnswered.length / wordsStudied) * 100);

  updateWordStatistics(userId, rightlyAnswered, 'correct').catch((err) => err);
  updateWordStatistics(userId, wronglyAnswered, 'incorrect').catch(
    (err) => err
  );

  dispatch(
    updateStatisticsGames(userId, game, wordsStudied, accuracy, maxInARow)
  );
};
