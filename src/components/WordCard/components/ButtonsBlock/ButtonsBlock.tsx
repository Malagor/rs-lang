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
  loadUserLearningWords,
  removeWordFromUserList,
  updateWordInUserList,
} from 'modules/TextBookPage/actions';
import { updateStatistics } from 'modules/StatisticsPage/actions';

import { selectWordSection } from 'modules/TextBookPage/selectors';
import { useIsWordIncluded } from 'hooks/useIsWordIncluded';
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  EASY_DIFFICULTY,
  HARD_DIFFICULTY,
  LEARNING_SECTION,
} from 'appConstants';
import { Container } from './styled';

type Props = {
  colorGroup: string;
  showBtnDeleteDifficult: boolean;
  isHard: boolean | undefined;
  showBtnRestore: boolean;
  wordId: string;
  page: number;
  group: number;
};

export const ButtonsBlock: React.FC<Props> = ({
  colorGroup,
  wordId,
  showBtnDeleteDifficult,
  isHard,
  showBtnRestore,
  page,
  group,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
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
      if (type === HARD_DIFFICULTY && !isHard) {
        updateStatistics(userId, 1);
      }
    } else {
      await addWordToUserList(userID, wordID, type);
      if (type === HARD_DIFFICULTY) {
        dispatch(updateStatistics(userId, 1));
      }
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
    if (wordSection === LEARNING_SECTION)
      dispatch(loadUserLearningWords(userID, groupNumber, pageNumber));

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
