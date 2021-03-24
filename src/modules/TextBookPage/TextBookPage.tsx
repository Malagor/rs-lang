import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Word } from 'types';
import { Container, Paper } from '@material-ui/core';
import { setPageTitle } from 'store/commonState/actions';
import { selectGroup, selectPage, selectWords } from './selectors';
import { loadWords } from './actions';

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

  // const onNextPageHandler = () => {
  //   const nextPage = page === 29 ? 29 : page + 1;
  //   dispatch(setPage(nextPage));
  // };
  //
  // const onPrevPageHandler = () => {
  //   const prevPage = page === 0 ? 0 : page - 1;
  //   dispatch(setPage(prevPage));
  // };
  //
  // const onPrevGroupHandler = () => {
  //   const prevGroup = group === 0 ? 0 : group - 1;
  //   dispatch(setPage(0));
  //   dispatch(setGroup(prevGroup));
  // };
  //
  // const onNextGroupHandler = () => {
  //   dispatch(setPage(0));
  //   const nextGroup = group === 5 ? 5 : group + 1;
  //   dispatch(setGroup(nextGroup));
  // };

  return (
    <Container>
      <Paper>
        hi
        {/* <div>Group: {group}</div> */}
        {/* <Button */}
        {/*  type="button" */}
        {/*  color="primary" */}
        {/*  variant="contained" */}
        {/*  onClick={onPrevGroupHandler} */}
        {/* > */}
        {/*  Prev Group */}
        {/* </Button> */}
        {/* <Button */}
        {/*  variant="contained" */}
        {/*  color="primary" */}
        {/*  type="button" */}
        {/*  onClick={onNextGroupHandler} */}
        {/* > */}
        {/*  Next Group */}
        {/* </Button> */}
        {/* <hr /> */}
        {/* <div>Page: {page}</div> */}
        {/* <Button */}
        {/*  variant="contained" */}
        {/*  color="primary" */}
        {/*  type="button" */}
        {/*  onClick={onPrevPageHandler} */}
        {/* > */}
        {/*  Prev Page */}
        {/* </Button> */}
        {/* <Button */}
        {/*  variant="contained" */}
        {/*  color="primary" */}
        {/*  type="button" */}
        {/*  onClick={onNextPageHandler} */}
        {/* > */}
        {/*  Next Page */}
        {/* </Button> */}
        {/* <hr /> */}
        {/* {words && <WordList words={words} />} */}
      </Paper>
    </Container>
  );
};
