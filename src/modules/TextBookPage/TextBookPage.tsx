import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Container, Grid } from '@material-ui/core';
import { ErrorMessage, Loader, Pagination } from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { GroupSelector } from 'components/GroupSelector';
import { selectUser } from 'modules/Login/selectors';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectTextBookError,
  selectTextBookWords,
} from './selectors';
import { loadUserAggregateWords, loadWords } from './actions';
import { WordList } from './components';
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

  useEffect(() => {
    if (user.id) {
      dispatch(loadUserAggregateWords(user.id, group, page));
    } else {
      dispatch(loadWords(group, page));
    }
  }, [dispatch, page, group, user]);

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));
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

  const hasContent = words && words.length;

  return (
    <Container>
      {error && <ErrorMessage />}
      {hasContent ? (
        <div className={classes.contentWrapper}>
          <Grid container>
            <Grid item xs={12} sm={11} className={classes.mainGrid}>
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
              <WordList words={words} />
              <Pagination
                pageCount={30}
                initialPage={page}
                forcePage={page}
                group={group}
              />
            </Grid>
            <Grid item xs={12} sm={1} className={classes.sideGrid}>
              <GroupSelector isOpacity={scroll > 200} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Loader />
      )}
    </Container>
  );
};
