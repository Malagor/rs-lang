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
  selectIsLoading,
} from './selectors';
import {
  loadUserAggregateWords,
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
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));
    dispatch(setGroup(0));
    dispatch(setPage(0));
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserAggregateWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user]);

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

      <div
        style={{
          paddingBottom: '8px',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <>
          {error && <ErrorMessage />}
          {isLoading ? (
            <Loader />
          ) : (
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
          )}
        </>
      </div>
    </Container>
  );
};
