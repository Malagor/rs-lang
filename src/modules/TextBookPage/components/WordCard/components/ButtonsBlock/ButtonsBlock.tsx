import React from 'react';
import { Button, useTheme, withStyles } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { DifficultyType } from 'types';
import {
  addWordToUserList,
  loadUserAggregateWords,
  removeWordFromUserList,
  updateWordInUserList,
} from 'modules/TextBookPage/actions';
import { selectGroup, selectPage } from 'modules/TextBookPage/selectors';
import { useIsWordIncluded } from 'hooks/useIsWordInList';
import { Container } from './styled';

type Props = {
  colorGroup: string;
  wordId: string;
};

export const ButtonsBlock: React.FC<Props> = ({ colorGroup, wordId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const page = useSelector(selectPage);
  const group = useSelector(selectGroup);
  const hasWordInList = useIsWordIncluded(wordId);

  const DifficultBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: colorGroup,
      borderRadius: 0,
      color: COLOR_LAYOUT_WHITE,
      textTransform: 'lowercase',

      '&:hover': {
        background: colorGroup,
      },
    },
  })(Button);

  const DeleteBtn = withStyles({
    root: {
      width: '104px',
      height: '37px',
      background: COLOR_LAYOUT_GRAY,
      borderRadius: 0,
      textTransform: 'lowercase',
      '&:hover': {
        background: COLOR_LAYOUT_GRAY,
      },
    },
  })(Button);

  const handlerAddWordToList = async (
    userID: string,
    wordID: string,
    type: DifficultyType,
    groupNumber: number,
    pageNumber: number
  ) => {
    if (hasWordInList) {
      await updateWordInUserList(userID, wordID, type);
    } else {
      await addWordToUserList(userID, wordID, type);
    }
    dispatch(loadUserAggregateWords(userID, groupNumber, pageNumber));
  };

  const handlerRemoveWordFromList = async (
    userID: string,
    wordID: string,
    groupNumber: number,
    pageNumber: number
  ) => {
    await removeWordFromUserList(userID, wordID);
    dispatch(loadUserAggregateWords(userID, groupNumber, pageNumber));
  };

  return (
    <Container theme={theme}>
      <DifficultBtn
        variant="contained"
        onClick={() =>
          handlerAddWordToList(userId, wordId, 'hard', group, page)
        }
      >
        difficult
      </DifficultBtn>
      <DeleteBtn
        variant="contained"
        onClick={() =>
          handlerAddWordToList(userId, wordId, 'easy', group, page)
        }
      >
        delete
      </DeleteBtn>
      <DeleteBtn
        variant="contained"
        color="secondary"
        onClick={() => handlerRemoveWordFromList(userId, wordId, group, page)}
      >
        restore
      </DeleteBtn>
    </Container>
  );
};
