import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container } from '@material-ui/core';
import { ErrorMessage, Pagination } from 'components';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
} from './selectors';
import { loadWords, setGroup, setPage } from './actions';
import { WordList } from './components';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWords(group, page));
  }, [dispatch, page, group]);

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));
  }, [dispatch]);

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

  const hasContend = words && words.length;

  return (
    <Container>
      <div>Group: {group}</div>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={onPrevGroupHandler}
      >
        Prev Group
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onNextGroupHandler}
      >
        Next Group
      </Button>
      <hr />
      <div>Page: {page}</div>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onPrevPageHandler}
      >
        Prev Page
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onNextPageHandler}
      >
        Next Page
      </Button>
      <hr />

      <div style={{ paddingBottom: '8px' }}>
        <>
          {error && <ErrorMessage />}

          {hasContend ? (
            <>
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
              <WordList words={words} />
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
            </>
          ) : null}
        </>
      </div>
    </Container>
  );
};
