import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { selectGroup, selectPage, selectWords } from './selectors';
import { loadWords, setGroup, setPage } from './actions';
import { WordList, Pagination } from './components';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectWords);
  const page = useSelector(selectPage);
  const group = useSelector(selectGroup);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWords(group, page));
  }, [dispatch, page, group]);

  const onNextPageHandler = () => {
    const nextPage = page === 29 ? 29 : page + 1;
    dispatch(setPage(nextPage));
  };

  const onPrevPageHandler = () => {
    const prevPage = page === 0 ? 0 : page - 1;
    dispatch(setPage(prevPage));
  };

  const onPrevGroupHandler = () => {
    const prevGroup = group === 0 ? 0 : group - 1;
    dispatch(setPage(0));
    dispatch(setGroup(prevGroup));
  };

  const onNextGroupHandler = () => {
    dispatch(setPage(0));
    const nextGroup = group === 5 ? 5 : group + 1;
    dispatch(setGroup(nextGroup));
  };

  return (
    <div>
      <h2>TextBookPage</h2>
      <div>Group: {group}</div>
      <button type="button" onClick={onPrevGroupHandler}>
        Prev Group
      </button>
      <button type="button" onClick={onNextGroupHandler}>
        Next Group
      </button>
      <hr />
      <div>Page: {page}</div>
      <button type="button" onClick={onPrevPageHandler}>
        Prev Page
      </button>
      <button type="button" onClick={onNextPageHandler}>
        Next Page
      </button>
      <hr />

      {words && (
        <>
          <WordList words={words} />{' '}
          <Pagination numberOfPages={20} initialPage={0} />
        </>
      )}
    </div>
  );
};
