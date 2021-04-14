import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Word } from 'types';
import { Container } from '@material-ui/core';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  RedirectionModal,
  NavGame,
} from 'components';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectUser,
  selectUserId,
  selectAuthLoadingStatus,
} from 'modules/Login/selectors';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
  selectCheckedDifficulties,
  selectPagesCount,
  selectWordSection,
  selectIsLoading,
} from 'modules/TextBookPage/selectors';
import {
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadUserLearningWords,
  loadWords,
  setCheckedDifficulties,
  setGroup,
  setPage,
  setWordSection,
} from 'modules/TextBookPage/actions';
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  LEARNING_SECTION,
  NORMAL_DIFFICULTY,
} from 'appConstants';
import { useStyles } from 'modules/TextBookPage/styled';
import { GroupSelector } from 'components/GroupSelector';
import { Sections } from './components';
import { LoadWrapper } from './styled';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);
  const checkedDifficulties = useSelector(selectCheckedDifficulties);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [scroll, setScroll] = useState(0);
  const isUserLoading = useSelector(selectAuthLoadingStatus);
  const classes = useStyles();

  useEffect(() => {
    dispatch(setPageTitle('Dictionary'));
    dispatch(setGroup(0));
    dispatch(setPage(0));
  }, [dispatch]);

  useEffect(() => {
    let lastKnownScrollPosition = scroll;
    let ticking = false;

    const handlerScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScroll(lastKnownScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, [scroll]);

  useEffect(() => {
    if (user.id) {
      if (wordSection === LEARNING_SECTION)
        dispatch(loadUserLearningWords(user.id, group, page));

      if (wordSection === DIFFICULT_SECTION)
        dispatch(loadUserDifficultWords(user.id, group, page));

      if (wordSection === DELETED_SECTION)
        dispatch(loadUserDeletedWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user, wordSection]);

  const onLearningWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(LEARNING_SECTION));
    dispatch(setCheckedDifficulties([EASY_DIFFICULTY]));
  };

  const onDifficultWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(DIFFICULT_SECTION));
    dispatch(setCheckedDifficulties([NORMAL_DIFFICULTY, EASY_DIFFICULTY]));
  };
  const onDeletedWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(DELETED_SECTION));
    dispatch(setCheckedDifficulties([NORMAL_DIFFICULTY, HARD_DIFFICULTY]));
  };

  if (!userId && !isUserLoading) return <RedirectionModal />;
  if (!userId && isUserLoading) return <Loader />;

  return (
    <Container>
      {error && <ErrorMessage />}
      {isLoading && (
        <LoadWrapper>
          <Loader />
        </LoadWrapper>
      )}

      <div className={classes.contentWrapper}>
        <div className={classes.containerGridDictionary}>
          <div className={classes.gamesWrapper}>
            <NavGame />
          </div>
          <div className={classes.paginationTop}>
            <Pagination
              pageCount={pagesCount}
              initialPage={page}
              forcePage={page}
              group={group}
            />
          </div>
          <div className={classes.topicWrapper}>
            <Sections
              group={group}
              activeSection={wordSection}
              handlers={[onLearningWords, onDifficultWords, onDeletedWords]}
            />
          </div>
          <div className={classes.mainGrid}>
            <WordList
              words={words}
              checkedDifficulties={checkedDifficulties}
              isButtons={true}
              showBtnDeleteDifficult={wordSection === LEARNING_SECTION}
              showBtnRestore={wordSection !== LEARNING_SECTION}
            />
          </div>
          <div className={classes.sideGrid}>
            <GroupSelector isOpacity={scroll > 200} />
          </div>
          <div className={classes.paginationBottom}>
            <Pagination
              pageCount={pagesCount}
              initialPage={page}
              forcePage={page}
              group={group}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
