import React, { FC } from 'react';
import { Fab } from '@material-ui/core';
import { useStyles } from './styled';

type ButtonGroupSelectorProps = {
  isActivePage: boolean;
  onChangeGroupHandler: Function;
  children: number;
  color: string;
};

export const ButtonGroupSelector: FC<ButtonGroupSelectorProps> = ({
  isActivePage,
  onChangeGroupHandler,
  children,
  color,
}) => {
  const styleProps = { backgroundColor: color, isActivePage };
  const classes = useStyles(styleProps);

  return (
    <Fab
      onClick={() => onChangeGroupHandler()}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Fab>
  );
};
