import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Word, WordSectionType } from 'types';
import { Container } from '@material-ui/core';
import { LocStore } from 'services';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  RedirectionModal,
  NavGame,
} from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { selectUserId, selectAuthLoadingStatus } from 'modules/Login/selectors';
import {
  selectDictionaryGroup,
  selectDictionaryPage,
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
  setDictionaryGroup,
  setDictionaryPage,
  setCheckedDifficulties,
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
  const page = useSelector(selectDictionaryPage);
  const group = useSelector(selectDictionaryGroup);
  const error = useSelector(selectTextBookError);
  const checkedDifficulties = useSelector(selectCheckedDifficulties);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);
  const userId = useSelector(selectUserId);
  const isUserLoading = useSelector(selectAuthLoadingStatus);
  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onGroupChange = (groupNumber: number) => {
    dispatch(setDictionaryGroup(groupNumber));
    LocStore.setDictionaryPosition({ group: groupNumber });
  };

  const onPageClick = (pageNumber: number) => {
    if (pagesCount) {
      dispatch(setDictionaryPage(pageNumber));
      LocStore.setDictionaryPosition({ page: pageNumber });
    }
  };

  useEffect(() => {
    dispatch(setPageTitle('Dictionary'));
  }, [dispatch]);

  useEffect(() => {
    const { group: groupNumber, page: pageNumber, section } =
      LocStore.getDictionaryPosition() || {};
    dispatch(setWordSection(section || LEARNING_SECTION));
    dispatch(setDictionaryGroup(groupNumber || 0));
    if (pagesCount) {
      dispatch(
        setDictionaryPage(
          pageNumber && pageNumber < pagesCount ? pageNumber : 0
        )
      );
    }
  }, [dispatch, pagesCount]);

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
    if (userId) {
      if (wordSection === LEARNING_SECTION)
        dispatch(loadUserLearningWords(userId, group, page));

      if (wordSection === DIFFICULT_SECTION)
        dispatch(loadUserDifficultWords(userId, group, page));

      if (wordSection === DELETED_SECTION)
        dispatch(loadUserDeletedWords(userId, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, userId, wordSection]);

  const onSectionChange = (section: WordSectionType) => {
    dispatch(setWordSection(section));
    dispatch(setDictionaryPage(0));
    LocStore.setDictionaryPosition({
      page: 0,
      section,
    });
  };

  const onLearningWords = () => {
    onSectionChange(LEARNING_SECTION);
    dispatch(setCheckedDifficulties([EASY_DIFFICULTY]));
  };

  const onDifficultWords = () => {
    onSectionChange(DIFFICULT_SECTION);
    dispatch(setCheckedDifficulties([NORMAL_DIFFICULTY, EASY_DIFFICULTY]));
  };

  const onDeletedWords = () => {
    onSectionChange(DELETED_SECTION);
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
              onPageClick={onPageClick}
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
              group={group}
              page={page}
              words={words}
              checkedDifficulties={checkedDifficulties}
              isButtons={true}
              showBtnDeleteDifficult={wordSection === LEARNING_SECTION}
              showBtnRestore={wordSection !== LEARNING_SECTION}
            />
          </div>
          <div className={classes.sideGrid}>
            <GroupSelector
              group={group}
              isOpacity={scroll > 200}
              onGroupChange={onGroupChange}
            />
          </div>
          <div className={classes.paginationBottom}>
            <Pagination
              pageCount={pagesCount}
              initialPage={page}
              forcePage={page}
              group={group}
              onPageClick={onPageClick}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
