import React from 'react';
import { Button, useTheme, withStyles } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { database } from 'services';
import { CreateUserWordType } from 'types';
import { loadUserAggregateWords } from 'modules/TextBookPage/actions';
import { selectGroup, selectPage } from 'modules/TextBookPage/selectors';
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

  const onDifficultHandler = async (id: string) => {
    const options: CreateUserWordType = {
      userId,
      wordId: id,
      wordOptions: {
        difficulty: 'hard',
      },
    };
    await database.createUserWord(options);
    dispatch(loadUserAggregateWords(userId, group, page));
  };

  return (
    <Container theme={theme}>
      <DifficultBtn
        variant="contained"
        onClick={() => onDifficultHandler(wordId)}
      >
        difficult
      </DifficultBtn>
      <DeleteBtn variant="contained">delete</DeleteBtn>
    </Container>
  );
};
