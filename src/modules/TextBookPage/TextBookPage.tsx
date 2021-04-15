import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateTextBook, Word } from 'types';
import { Container } from '@material-ui/core';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  NavGame,
} from 'components';
import {
  EASY_DIFFICULTY,
  MIN_WORDS_TO_PLAY,
  PAGES_IN_EACH_GROUP,
  WordsSource,
} from 'appConstants';
import { LocStore } from 'services';
import { useIsPageTopMatch } from 'hooks/useIsPageTopMatch';
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
  const isGroupSelectorHidden = useIsPageTopMatch(200);
  const [gettingGameWords, setGettingGameWords] = useState(false);
  const [checkPageForGameWords, setCheckPageForGameWords] = useState(-1);
  const [checkGroupForGameWords, setCheckGroupForGameWords] = useState(-1);
  const [noMoreGameWords, setNoMoreGameWords] = useState(false);

  const dispatch: ThunkDispatch<StateTextBook, void, AnyAction> = useDispatch();

  const onGroupChange = (groupNumber: number) => {
    dispatch(setGroup(groupNumber));
    dispatch(setPage(0));
    LocStore.setTextBookPosition({ group: groupNumber, page: 0 });
  };

  const onPageClick = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
    LocStore.setTextBookPosition({ page: pageNumber });
  };

  useEffect(() => {
    dispatch(setGameWordsKind(WordsSource.FROM_TEXTBOOK));
    dispatch(setIsLoading(true));
    dispatch(setPageTitle('TextBook'));

    const { page: pageNumber, group: groupNumber } =
      LocStore.getTextBookPosition() || {};

    dispatch(setGroup(groupNumber || 0));
    dispatch(setPage(pageNumber || 0));
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

      if (checkGroupForGameWords === -1 && checkPageForGameWords === -1) {
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

  const classes = useStyles();

  const hasContent = words && words.length;

  return (
    <Container>
      {(gettingGameWords || isLoading) && (
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
                onPageClick={onPageClick}
              />
            </div>
            <div className={classes.mainGrid}>
              <WordList
                group={group}
                page={page}
                words={words}
                checkedDifficulties={[EASY_DIFFICULTY]}
                isButtons={true}
                showBtnDeleteDifficult={true}
                showBtnRestore={false}
              />
            </div>
            <div className={classes.sideGrid}>
              <GroupSelector
                group={group}
                isOpacity={isGroupSelectorHidden}
                onGroupChange={onGroupChange}
              />
            </div>
            <div className={classes.paginationBottom}>
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
                onPageClick={onPageClick}
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
