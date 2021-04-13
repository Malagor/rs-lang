import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { StateTextBook, Word } from 'types';
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
  selectCheckedDifficulty,
  selectPagesCount,
  selectWordSection,
  selectIsLoading,
  selectGameWords,
} from 'modules/TextBookPage/selectors';
import {
  loadAdditionalGameWords,
  loadUserAggregateWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadWords,
  setCheckedDifficulty,
  setGameWords,
  setGameWordsKind,
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
  MIN_WORDS_TO_PLAY,
  WordsSource,
} from 'appConstants';
import { useStyles } from 'modules/TextBookPage/styled';
import { GroupSelector } from 'components/GroupSelector';
import { getNonDeletedWords } from 'helpers/getNonDeletedWords';
import { Sections } from './components';
import { LoadWrapper } from './styled';

type DictionaryProps = {};

export const DictionaryPage: FC<DictionaryProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const gameWords: Word[] = useSelector(selectGameWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);
  const checkedDifficulty = useSelector(selectCheckedDifficulty);
  const pagesCount = useSelector(selectPagesCount);
  const wordSection = useSelector(selectWordSection);
  const isLoading = useSelector(selectIsLoading);
  const dispatch: ThunkDispatch<StateTextBook, void, AnyAction> = useDispatch();
  const userId = useSelector(selectUserId);
  const [scroll, setScroll] = useState(0);
  const isUserLoading = useSelector(selectAuthLoadingStatus);
  const classes = useStyles();
  const [gettingGameWords, setGettingGameWords] = useState(false);
  const [checkPageForGameWords, setCheckPageForGameWords] = useState(-1);
  const [checkGroupForGameWords, setCheckGroupForGameWords] = useState(-1);
  const [noMoreGameWords, setNoMoreGameWords] = useState(false);

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
    if (wordSection === LEARNING_SECTION) {
      dispatch(setGameWords(getNonDeletedWords(words)));
      dispatch(setGameWordsKind(WordsSource.FROM_LEARNING));
    } else if (wordSection === DIFFICULT_SECTION) {
      dispatch(setGameWords(words));
      dispatch(setGameWordsKind(WordsSource.FROM_DIFFICULT));
    } else {
      dispatch(setGameWords(words));
      dispatch(setGameWordsKind(WordsSource.FROM_DELETED));
    }
    setGettingGameWords(true);
    setNoMoreGameWords(false);
    if (group === 0 && page === 0) {
      setCheckGroupForGameWords(-1);
      setCheckPageForGameWords(-1);
    } else if (page === 0) {
      setCheckGroupForGameWords(group - 1);
      setCheckPageForGameWords(pagesCount - 1);
    } else {
      setCheckGroupForGameWords(group);
      setCheckPageForGameWords(page - 1);
    }
  }, [dispatch, page, group, words, wordSection, pagesCount]);

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

  useEffect(() => {
    if (!isUserLoading && !isLoading && !noMoreGameWords) {
      if (gameWords.length >= MIN_WORDS_TO_PLAY) {
        setGettingGameWords(false);
        return;
      }

      // Need to get more words for the games

      if (checkGroupForGameWords === -1 && checkPageForGameWords === -1) {
        // Can't get more words for playing
        setNoMoreGameWords(true);
        setGettingGameWords(false);
        return;
      }

      dispatch(
        loadAdditionalGameWords(
          userId,
          checkGroupForGameWords,
          checkPageForGameWords,
          20,
          wordSection
        )
      ).then(() => {
        if (checkGroupForGameWords === 0 && checkPageForGameWords === 0) {
          setCheckGroupForGameWords(-1);
          setCheckPageForGameWords(-1);
        } else if (checkPageForGameWords === 0) {
          setCheckGroupForGameWords(checkGroupForGameWords - 1);
          setCheckPageForGameWords(29);
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

  // console.log('updated game words', gameWords);

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
            />
          </div>
          <div className={classes.topicWrapper}>
            <Sections
              group={group}
              activeSection={wordSection}
              handlers={[onUsualWords, onDifficultWords, onDeletedWords]}
            />
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
