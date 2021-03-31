import React, { FC } from 'react';
import { Radio } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styled';

type AnswerRadioProps = {
  iscorrect: string;
};

export const AnswerRadio: FC<AnswerRadioProps> = (props) => {
  const classes = useStyles();
  return (
    <Radio
      classes={{ root: classes.root, checked: classes.checked }}
      disableRipple
      color="default"
      checkedIcon={
        props.iscorrect === 'true' ? (
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
