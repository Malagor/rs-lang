import React from 'react';
import { Button, useTheme, withStyles } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { DifficultyType } from 'types';
import {
  addWordToUserList,
  loadUserAggregateWords,
  loadUserDeletedWords,
  loadUserDifficultWords,
  removeWordFromUserList,
  updateWordInUserList,
} from 'modules/TextBookPage/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
  selectWordSection,
} from 'modules/TextBookPage/selectors';
import { useIsWordIncluded } from 'hooks/useIsWordIncluded';
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  USUAL_SECTION,
} from 'appConstants';
import { Container } from './styled';

type Props = {
  colorGroup: string;
  showBtnDeleteDifficult: boolean;
  showBtnRestore: boolean;
  wordId: string;
};

export const ButtonsBlock: React.FC<Props> = ({
  colorGroup,
  wordId,
  showBtnDeleteDifficult,
  showBtnRestore,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const page = useSelector(selectTextBookPage);
  const group = useSelector(selectTextBookGroup);
  const hasWordInList = useIsWordIncluded(wordId);
  const wordSection = useSelector(selectWordSection);

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
      marginRight: '14px',
      background: COLOR_LAYOUT_GRAY,
      borderRadius: 0,
      textTransform: 'lowercase',
      '&:hover': {
        background: COLOR_LAYOUT_GRAY,
      },
    },
  })(Button);

  const handleAddWordToList = async (
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
    if (wordSection === USUAL_SECTION)
      dispatch(loadUserAggregateWords(userID, groupNumber, pageNumber));

    if (wordSection === DIFFICULT_SECTION)
      dispatch(loadUserDifficultWords(userID, groupNumber, pageNumber));

    if (wordSection === DELETED_SECTION)
      dispatch(loadUserDeletedWords(userID, groupNumber, pageNumber));
  };

  return (
    <Container theme={theme}>
      {showBtnDeleteDifficult && (
        <>
          <DifficultBtn
            variant="contained"
            onClick={() =>
              handleAddWordToList(userId, wordId, HARD_DIFFICULTY, group, page)
            }
          >
            difficult
          </DifficultBtn>

          <DeleteBtn
            variant="contained"
            onClick={() =>
              handleAddWordToList(userId, wordId, EASY_DIFFICULTY, group, page)
            }
          >
            delete
          </DeleteBtn>
        </>
      )}
      {showBtnRestore && (
        <DifficultBtn
          variant="contained"
          onClick={() => handlerRemoveWordFromList(userId, wordId, group, page)}
        >
          restore
        </DifficultBtn>
      )}
    </Container>
  );
};
