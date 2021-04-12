import { EASY_DIFFICULTY } from 'appConstants';
import { Word } from 'types';

export const getNonDeletedWords = (wordsArray: Word[]) =>
  wordsArray
    .slice()
    .filter(
      (word) => !word.userWord || word.userWord.difficulty !== EASY_DIFFICULTY
    );
