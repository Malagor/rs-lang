import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container } from '@material-ui/core';
import { ErrorMessage, Loader, Pagination, WordList } from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { selectUser } from 'modules/Login/selectors';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
  selectPagesCount,
} from './selectors';
import {
  loadUserAggregateWords,
  // loadUserDeletedWords,
  // loadUserDifficultWords,
  loadWords,
  setGroup,
  setPage,
} from './actions';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);
  const pagesCount = useSelector(selectPagesCount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserAggregateWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user]);

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));
  }, [dispatch]);

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

  // const onUsualWords = () => {
  //   dispatch(setPage(0));
  //   dispatch(setGroup(0));
  //   dispatch(loadUserAggregateWords(user.id, group, page));
  // };

  // const onDifficultWords = () => {
  //   dispatch(setPage(0));
  //   dispatch(setGroup(0));
  //   dispatch(loadUserDifficultWords(user.id, group, page));
  // };
  // const onDeletedWords = () => {
  //   dispatch(setPage(0));
  //   dispatch(setGroup(0));
  //   dispatch(loadUserDeletedWords(user.id, group, page));
  // };

  const hasContent = words && words.length;

  return (
    <Container>
      {/* <div>Type of Words: </div>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={onUsualWords}
      >
        Usual Words
      </Button>
      <Button
        variant="contained"
        color="default"
        type="button"
        onClick={onDifficultWords}
      >
        Difficult words
      </Button>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={onDeletedWords}
      >
        Deleted words
      </Button>
      <hr /> */}
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

      <div
        style={{
          paddingBottom: '8px',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <>
          {error && <ErrorMessage />}
          {hasContent ? (
            <>
              <WordList
                words={words}
                checkedDifficulty="easy"
                isButtons={true}
                showBtnDeleteDifficult={true}
                showBtnRestore={false}
              />
              <Pagination
                pageCount={pagesCount}
                initialPage={page}
                forcePage={page}
                group={group}
              />
            </>
          ) : (
            <Loader />
          )}
        </>
      </div>
    </Container>
  );
};
