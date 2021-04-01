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
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  USUAL_SECTION,
} from 'appConstants';
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
      if (wordSection === USUAL_SECTION)
        dispatch(loadUserAggregateWords(user.id, group, page));

      if (wordSection === DIFFICULT_SECTION)
        dispatch(loadUserDifficultWords(user.id, group, page));

      if (wordSection === DELETED_SECTION)
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
    dispatch(setWordSection(USUAL_SECTION));
    dispatch(loadUserAggregateWords(user.id, group, page));
    dispatch(setCheckedDifficulty(EASY_DIFFICULTY));
  };

  const onDifficultWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(DIFFICULT_SECTION));
    dispatch(loadUserDifficultWords(user.id, group, page));
    dispatch(setCheckedDifficulty(EASY_DIFFICULTY));
  };
  const onDeletedWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(DELETED_SECTION));
    dispatch(loadUserDeletedWords(user.id, group, page));
    dispatch(setCheckedDifficulty(HARD_DIFFICULTY));
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
          showBtnDeleteDifficult={wordSection === USUAL_SECTION}
          showBtnRestore={wordSection !== USUAL_SECTION}
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
