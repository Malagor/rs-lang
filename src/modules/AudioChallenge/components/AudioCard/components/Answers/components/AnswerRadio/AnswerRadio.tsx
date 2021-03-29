import React, { FC } from 'react';
import { Radio } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styled';

type AnswerRadioProps = {
  isCorrect: boolean;
};

export const AnswerRadio: FC<AnswerRadioProps> = (props) => {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      // checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      checkedIcon={
        props.isCorrect ? (
          <CheckIcon className={classes.icon} />
        ) : (
          <CloseIcon className={classes.icon} />
        )
      }
      icon={<div style={{ width: '12px', height: '12px' }} />}
      size="medium"
      {...props}
    />
  );
};
