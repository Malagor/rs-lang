import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Button, Container, Paper, Grid } from '@material-ui/core';
import { Pagination } from 'components';
import { setPageTitle } from 'store/commonState/actions';
import { GroupSelector } from 'components/GroupSelector';
import { selectGroup, selectPage, selectWords } from './selectors';
import { loadWords, setGroup, setPage } from './actions';
import { WordList } from './components';
import { useStyles } from './styled';

type TextBookPageProps = {};

export const TextBookPage: FC<TextBookPageProps> = () => {
  const words: Word[] = useSelector(selectWords);
  const page = useSelector(selectPage);
  const group = useSelector(selectGroup);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWords(group, page));
  }, [dispatch, page, group]);

  useEffect(() => {
    dispatch(setPageTitle('TextBook'));
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Grid container className={classes.buttonGroup}>
      <Grid item xs={12} sm={11}>
        <Container>
          <Paper>
            {words && (
              <div style={{ paddingBottom: '8px' }}>
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
              </div>
            )}
          </Paper>
        </Container>
      </Grid>
      <Grid item xs={12} sm={1}>
        <GroupSelector />
      </Grid>
    </Grid>
  );
};
