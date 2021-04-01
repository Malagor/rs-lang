import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container } from '@material-ui/core';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  RedirectionModal,
} from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { selectUser, selectUserId } from 'modules/Login/selectors';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
  selectCheckedDifficulty,
  selectPagesCount,
  selectWordSection,
  selectIsLoading,
} from 'modules/TextBookPage/selectors';
import {
  loadUserAggregateWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadWords,
  setCheckedDifficulty,
  setGroup,
  setPage,
  setWordSection,
} from 'modules/TextBookPage/actions';
import { Sections } from './components';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);
  const checkedDifficulty = useSelector(selectCheckedDifficulty);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(setPageTitle('Dictionary'));
    dispatch(setGroup(0));
    dispatch(setPage(0));
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      if (wordSection === 'usual')
        dispatch(loadUserAggregateWords(user.id, group, page));

      if (wordSection === 'difficult')
        dispatch(loadUserDifficultWords(user.id, group, page));

      if (wordSection === 'deleted')
        dispatch(loadUserDeletedWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user, wordSection]);

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
    dispatch(setGroup(group));
    dispatch(setWordSection('usual'));
    dispatch(loadUserAggregateWords(user.id, group, page));
    dispatch(setCheckedDifficulty('easy'));
  };

  const onDifficultWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection('difficult'));
    dispatch(loadUserDifficultWords(user.id, group, page));
    dispatch(setCheckedDifficulty('easy'));
  };
  const onDeletedWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection('deleted'));
    dispatch(loadUserDeletedWords(user.id, group, page));
    dispatch(setCheckedDifficulty('hard'));
  };

  if (!userId) return <RedirectionModal />;

  return (
    <Container>
      <Sections
        group={group}
        wordSection={wordSection}
        handlers={[onUsualWords, onDifficultWords, onDeletedWords]}
      />

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

      <>
        {error && <ErrorMessage />}

        {isLoading && <Loader />}

        <WordList
          words={words}
          checkedDifficulty={checkedDifficulty}
          isButtons={true}
          showBtnDeleteDifficult={wordSection === 'usual'}
          showBtnRestore={wordSection !== 'usual'}
        />

        <Pagination
          pageCount={pagesCount}
          initialPage={page}
          forcePage={page}
          group={group}
        />
      </>
    </Container>
  );
};
