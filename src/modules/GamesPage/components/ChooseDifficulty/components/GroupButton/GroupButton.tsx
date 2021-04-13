import { loadRandomGameWords } from 'modules/TextBookPage/actions';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateTextBook } from 'types';
import { useStyles } from './styled';

type GroupButtonProps = {
  group: number;
  chosenGameLink: string;
};

export const GroupButton: FC<GroupButtonProps> = ({
  group,
  chosenGameLink,
}) => {
  const classes = useStyles({ group });
  const dispatch: ThunkDispatch<StateTextBook, void, AnyAction> = useDispatch();
  const history = useHistory();

  const handleGroupClick = () => {
    dispatch(loadRandomGameWords(group)).then(() => {
      history.push(chosenGameLink);
    });
  };

  return (
    <button
      className={classes.groupButton}
      type="button"
      onClick={handleGroupClick}
    >
      <span className={classes.groupNumber}>{group + 1}</span>
    </button>
  );
};
