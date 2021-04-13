import { loadRandomGameWords } from 'modules/TextBookPage/actions';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './styled';

type GroupButtonProps = {
  group: number;
};

export const GroupButton: FC<GroupButtonProps> = ({ group }) => {
  const classes = useStyles({ group });
  const dispatch = useDispatch();

  const handleGroupClick = () => {
    dispatch(loadRandomGameWords(group));
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
