import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container } from '@material-ui/core';
import { Pagination } from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { selectUser } from 'modules/Login/selectors';
import { selectGroup, selectPage, selectWords } from './selectors';
import {
  loadUserAggregateWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadWords,
  setGroup,
  setPage,
} from './actions';
import { WordList } from './components';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectWords);
  const page = useSelector(selectPage);
  const group = useSelector(selectGroup);
  const user = useSelector(selectUser);

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

  const onUsualWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserAggregateWords(user.id, group, page));
  };

  const onDifficultWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserDifficultWords(user.id, group, page));
  };
  const onDeletedWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserDeletedWords(user.id, group, page));
  };

  return (
    <Container>
      <div>Type of Words: </div>
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
      <hr />
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
        ` Next Group
      </Button>
      <hr />

      {words && (
        <div style={{ paddingBottom: '8px' }}>
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
        </div>
      )}
    </Container>
  );
};
