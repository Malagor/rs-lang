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

      {words && (
        <div style={{ paddingBottom: '8px' }}>
          <Pagination pageCount={30} initialPage={0} group={group} />
          <WordList words={words} />
          <Pagination pageCount={30} initialPage={0} group={group} />
        </div>
      )}
    </Container>
  );
};
