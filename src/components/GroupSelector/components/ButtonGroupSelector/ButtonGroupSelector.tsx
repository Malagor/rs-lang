import React, { FC } from 'react';
import Fab from '@material-ui/core/Fab';
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
    <Fab
      onClick={() => onChangeGroupPageHandler()}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Fab>
  );
};
