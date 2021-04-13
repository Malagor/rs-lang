import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateTextBook, Word } from 'types';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  NavGame,
} from 'components';

import { Container } from '@material-ui/core';
import { setPageTitle } from 'store/commonState/actions';
import { GroupSelector } from 'components/GroupSelector';
import {
  selectAuthLoadingStatus,
  selectUser,
  selectUserId,
} from 'modules/Login/selectors';
import { getNonDeletedWords } from 'helpers/getNonDeletedWords';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  MIN_WORDS_TO_PLAY,
  PAGES_IN_EACH_GROUP,
  WordsSource,
} from 'appConstants';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
  selectIsLoading,
  selectGameWords,
} from './selectors';
import {
  loadUserAggregateWords,
  loadWords,
  setGroup,
  setIsLoading,
  setPage,
  setGameWords,
  loadAdditionalGameWords,
  setGameWordsKind,
} from './actions';
import { useStyles } from './styled';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const gameWords: Word[] = useSelector(selectGameWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectIsLoading);
  const isUserLoading = useSelector(selectAuthLoadingStatus);
  const [scroll, setScroll] = useState(0);
  const [gettingGameWords, setGettingGameWords] = useState(false);
  const [checkPageForGameWords, setCheckPageForGameWords] = useState(-1);
  const [checkGroupForGameWords, setCheckGroupForGameWords] = useState(-1);
  const [noMoreGameWords, setNoMoreGameWords] = useState(false);

  const dispatch: ThunkDispatch<StateTextBook, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(setGameWordsKind(WordsSource.FROM_TEXTBOOK));
    dispatch(setIsLoading(true));
    dispatch(setPageTitle('TextBook'));
    dispatch(setGroup(0));
    dispatch(setPage(0));
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserAggregateWords(user.id, group, page));
    } else if (!isUserLoading) {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user, isUserLoading]);

  useEffect(() => {
    dispatch(setGameWords(getNonDeletedWords(words)));
    setGettingGameWords(true);
    setNoMoreGameWords(false);
    if (group === 0 && page === 0) {
      setCheckGroupForGameWords(-1);
      setCheckPageForGameWords(-1);
    } else if (page === 0) {
      setCheckGroupForGameWords(group - 1);
      setCheckPageForGameWords(PAGES_IN_EACH_GROUP - 1);
    } else {
      setCheckGroupForGameWords(group);
      setCheckPageForGameWords(page - 1);
    }
  }, [dispatch, page, group, words]);

  useEffect(() => {
    if (!isUserLoading && !isLoading && !noMoreGameWords) {
      if (gameWords.length > MIN_WORDS_TO_PLAY) {
        setGettingGameWords(false);
        return;
      }

      // Need MORE words for playing games

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
          checkPageForGameWords
        )
      ).then(() => {
        if (checkGroupForGameWords === 0 && checkPageForGameWords === 0) {
          setCheckGroupForGameWords(-1);
          setCheckPageForGameWords(-1);
        } else if (checkPageForGameWords === 0) {
          setCheckGroupForGameWords(checkGroupForGameWords - 1);
          setCheckPageForGameWords(PAGES_IN_EACH_GROUP - 1);
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
  ]);

  // console.log('updated game words', gameWords);

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

  const hasContent = words && words.length;

  return (
    <Container>
      {(!gameWords.length || gettingGameWords || isLoading) && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Loader fixed />
        </div>
      )}
      {error && <ErrorMessage />}
      {hasContent ? (
        <div className={classes.contentWrapper}>
          <div className={classes.containerGrid}>
            <div className={classes.gamesWrapper}>
              <NavGame />
            </div>
            <div className={classes.paginationTop}>
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
            </div>
            <div className={classes.mainGrid}>
              <WordList
                words={words}
                checkedDifficulty="easy"
                isButtons={true}
                showBtnDeleteDifficult={true}
                showBtnRestore={false}
              />
            </div>
            <div className={classes.sideGrid}>
              <GroupSelector isOpacity={scroll > 200} />
            </div>
            <div className={classes.paginationBottom}>
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Container>
  );
};
