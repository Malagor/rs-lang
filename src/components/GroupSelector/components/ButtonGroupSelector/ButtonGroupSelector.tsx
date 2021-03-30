import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styled';

type ButtonGroupSelectorProps = {
  activePage: boolean;
  onChangeGroupPageHandler: Function;
  children: number;
  color: string;
};

export const ButtonGroupSelector: FC<ButtonGroupSelectorProps> = ({
  activePage,
  onChangeGroupPageHandler,
  children,
  color,
}) => {
  const styleProps = { backgroundColor: color, activePage };
  const classes = useStyles(styleProps);

  return (
    <Button
      onClick={() => onChangeGroupPageHandler()}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Button>
  );
};
