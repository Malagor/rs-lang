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
  LEARNING_SECTION,
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
  const checkedDifficulty = useSelector(selectCheckedDifficulty);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [scroll, setScroll] = useState(0);

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

  const classes = useStyles();

  useEffect(() => {
    if (user.id) {
      if (wordSection === LEARNING_SECTION)
        dispatch(loadUserAggregateWords(user.id, group, page));

      if (wordSection === DIFFICULT_SECTION)
        dispatch(loadUserDifficultWords(user.id, group, page));

      if (wordSection === DELETED_SECTION)
        dispatch(loadUserDeletedWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user, wordSection]);

  const onUsualWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(group));
    dispatch(setWordSection(LEARNING_SECTION));
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
      {error && <ErrorMessage />}
      {isLoading && (
        <LoadWrapper>
          <Loader />
        </LoadWrapper>
      )}

      <div className={classes.contentWrapper}>
        <div className={classes.containerGrid}>
          <div className={classes.paginationTop}>
            <Pagination
              pageCount={pagesCount}
              initialPage={page}
              forcePage={page}
              group={group}
            />
          </div>
          <div className={classes.gamesWrapper}>
            <Sections
              group={group}
              activeSection={wordSection}
              handlers={[onUsualWords, onDifficultWords, onDeletedWords]}
            />
            <NavGame />
          </div>
          <div className={classes.mainGrid}>
            <WordList
              words={words}
              checkedDifficulty={checkedDifficulty}
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
