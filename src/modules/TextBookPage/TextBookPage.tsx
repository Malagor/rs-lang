import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container, Paper, Grid } from '@material-ui/core';
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
import {
  loadUserAggregateWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  loadWords,
  setGroup,
  setPage,
} from './actions';
import { WordList } from './components';
import { useStyles } from './styled';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const error = useSelector(selectTextBookError);
  const user = useSelector(selectUser);

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

  const classes = useStyles();

  const onUsualWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserAggregateWords(user.id, group, page));
  };

  const onDifficultWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserDifficultWords(user.id, group, page));
  };
  const onDeletedWords = () => {
    dispatch(setPage(0));
    dispatch(setGroup(0));
    dispatch(loadUserDeletedWords(user.id, group, page));
  };

  const hasContent = words && words.length;

  return (
    <Grid container item className={classes.buttonGroup}>
      <Grid item xs={12} sm={11}>
        <Container>
          <div>Type of Words: </div>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={onUsualWords}
          >
            Usual Words
          </Button>
          <Button
            variant="contained"
            color="default"
            type="button"
            onClick={onDifficultWords}
          >
            Difficult words
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={onDeletedWords}
          >
            Deleted words
          </Button>
          <hr />

          <div
            style={{
              paddingBottom: '8px',
              minHeight: '200px',
              position: 'relative',
            }}
          >
            <>
              {error && <ErrorMessage />}
              {hasContent ? (
                <>
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
                </>
              ) : (
                <Loader />
              )}
            </>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12} sm={1}>
        <GroupSelector />
      </Grid>
    </Grid>
  );
};
