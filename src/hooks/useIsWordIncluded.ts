import { useSelector } from 'react-redux';
import { selectTextBookWords } from 'modules/TextBookPage/selectors';
import { Word } from 'types';

export function useIsWordIncluded(wordId: string) {
  const words = useSelector(selectTextBookWords);
  const indexWord = words.findIndex(
    (word: Word) =>
      // eslint-disable-next-line no-underscore-dangle
      word._id === wordId && word.userWord
  );

  return indexWord !== -1;
}
