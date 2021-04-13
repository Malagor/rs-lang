import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import {
  ErrorMessage,
  Loader,
  Pagination,
  WordList,
  NavGame,
} from 'components';

import { Container } from '@material-ui/core';
import { LocStore } from 'services';
import { setPageTitle } from 'store/commonState/actions';
import { GroupSelector } from 'components/GroupSelector';
import { selectUser } from 'modules/Login/selectors';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
} from './selectors';
import {
  loadUserAggregateWords,
  loadWords,
  setGroup,
  setPage,
} from './actions';
import { useStyles } from './styled';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);

  const [scroll, setScroll] = useState(0);

  const dispatch = useDispatch();

  const onGroupChange = (groupNumber: number) => {
    dispatch(setGroup(groupNumber));
    LocStore.setTextBookPosition({ group: groupNumber });
  };

  const onPageClick = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
    LocStore.setTextBookPosition({ page: pageNumber });
  };

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));

    const { page: pageNumber, group: groupNumber } =
      LocStore.getTextBookPosition() || {};

    dispatch(setGroup(groupNumber || 0));
    dispatch(setPage(pageNumber || 0));
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserAggregateWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user]);

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
                checkedDifficulty="easy"
                isButtons={true}
                showBtnDeleteDifficult={true}
                showBtnRestore={false}
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
