import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { StateTextBook, Word, WordSectionType } from 'types';
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
  selectGameWords,
} from 'modules/TextBookPage/selectors';
import {
  loadAdditionalGameWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadUserLearningWords,
  loadWords,
  setDictionaryGroup,
  setDictionaryPage,
  setGameWords,
  setGameWordsKind,
  setCheckedDifficulties,
  setWordSection,
} from 'modules/TextBookPage/actions';
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  LEARNING_SECTION,
  MIN_WORDS_TO_PLAY,
  WordsSource,
  WORDS_ON_EACH_PAGE,
  NORMAL_DIFFICULTY,
} from 'appConstants';
import { useStyles } from 'modules/TextBookPage/styled';
import { GroupSelector } from 'components/GroupSelector';
import { Sections } from './components';
import { LoadWrapper } from './styled';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const gameWords: Word[] = useSelector(selectGameWords);
  const page = useSelector(selectDictionaryPage);
  const group = useSelector(selectDictionaryGroup);
  const error = useSelector(selectTextBookError);
  const checkedDifficulties = useSelector(selectCheckedDifficulties);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);

  const dispatch: ThunkDispatch<StateTextBook, void, AnyAction> = useDispatch();

  const userId = useSelector(selectUserId);
  const isUserLoading = useSelector(selectAuthLoadingStatus);
  const [scroll, setScroll] = useState(0);
  const classes = useStyles();
  const [gettingGameWords, setGettingGameWords] = useState(false);
  const [checkPageForGameWords, setCheckPageForGameWords] = useState(-1);
  const [checkGroupForGameWords, setCheckGroupForGameWords] = useState(-1);
  const [noMoreGameWords, setNoMoreGameWords] = useState(false);

  const onGroupChange = (groupNumber: number) => {
    dispatch(setDictionaryGroup(groupNumber));
    dispatch(setDictionaryPage(0));
    LocStore.setDictionaryPosition({ group: groupNumber, page: 0 });
  };

  const onPageClick = (pageNumber: number) => {
    if (pagesCount) {
      dispatch(setDictionaryPage(pageNumber));
      LocStore.setDictionaryPosition({ page: pageNumber });
    }
  };

  const changeSection = (section: WordSectionType) => {
    dispatch(setWordSection(section));
    dispatch(setDictionaryPage(0));
    LocStore.setDictionaryPosition({
      page: 0,
      section,
    });
  };

  const onLearningWords = () => {
    changeSection(LEARNING_SECTION);
  };

  const onDifficultWords = () => {
    changeSection(DIFFICULT_SECTION);
  };

  const onDeletedWords = () => {
    changeSection(DELETED_SECTION);
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
    dispatch(setGameWords(words));
    if (wordSection === LEARNING_SECTION) {
      dispatch(setGameWordsKind(WordsSource.FROM_LEARNING));
    } else if (wordSection === DIFFICULT_SECTION) {
      dispatch(setGameWordsKind(WordsSource.FROM_DIFFICULT));
    } else {
      dispatch(setGameWordsKind(WordsSource.FROM_DELETED));
    }
    setGettingGameWords(true);
    setNoMoreGameWords(false);
    if (group === 0 && page === 0) {
      setCheckGroupForGameWords(-1);
      setCheckPageForGameWords(-1);
    } else if (page === 0) {
      setCheckGroupForGameWords(group - 1);
      setCheckPageForGameWords(0);
    } else {
      setCheckGroupForGameWords(group);
      setCheckPageForGameWords(page - 1);
    }
  }, [dispatch, page, group, words, wordSection, pagesCount]);

  useEffect(() => {
    if (userId) {
      if (wordSection === LEARNING_SECTION) {
        dispatch(setCheckedDifficulties([EASY_DIFFICULTY]));
        dispatch(loadUserLearningWords(userId, group, page));
      }
      if (wordSection === DIFFICULT_SECTION) {
        dispatch(setCheckedDifficulties([NORMAL_DIFFICULTY, EASY_DIFFICULTY]));
        dispatch(loadUserDifficultWords(userId, group, page));
      }
      if (wordSection === DELETED_SECTION) {
        dispatch(setCheckedDifficulties([NORMAL_DIFFICULTY, HARD_DIFFICULTY]));
        dispatch(loadUserDeletedWords(userId, group, page));
      }
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, userId, wordSection]);

  useEffect(() => {
    if (!isUserLoading && !isLoading && !noMoreGameWords) {
      if (gameWords.length >= MIN_WORDS_TO_PLAY) {
        setGettingGameWords(false);
        return;
      }

      if (checkGroupForGameWords === -1 && checkPageForGameWords === -1) {
        setNoMoreGameWords(true);
        setGettingGameWords(false);
        return;
      }

      dispatch(
        loadAdditionalGameWords(
          userId,
          checkGroupForGameWords,
          checkPageForGameWords,
          WORDS_ON_EACH_PAGE,
          wordSection
        )
      ).then(() => {
        if (checkGroupForGameWords === 0 && checkPageForGameWords === 0) {
          setCheckGroupForGameWords(-1);
          setCheckPageForGameWords(-1);
        } else if (checkPageForGameWords === 0) {
          setCheckGroupForGameWords(checkGroupForGameWords - 1);
          setCheckPageForGameWords(0);
        } else {
          setCheckPageForGameWords(checkPageForGameWords - 1);
        }
        setGettingGameWords(false);
      });
    }
  }, [
    isLoading,
    isUserLoading,
    dispatch,
    words,
    userId,
    gameWords.length,
    gettingGameWords,
    checkGroupForGameWords,
    checkPageForGameWords,
    noMoreGameWords,
    wordSection,
  ]);

  if (!userId && !isUserLoading) return <RedirectionModal />;
  if (!userId && isUserLoading) return <Loader />;

  return (
    <Container>
      {error && <ErrorMessage />}
      {(isLoading || gettingGameWords) && (
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
