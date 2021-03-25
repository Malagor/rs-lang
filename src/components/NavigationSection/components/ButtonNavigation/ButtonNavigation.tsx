import React, { FC } from 'react';
import Fab from '@material-ui/core/Fab';
import { useStyles } from './styled';

type ButtonNavigationProps = {
  activePage: boolean;
  onChangePageHandler: Function;
  children: number;
  color: string;
};

export const ButtonNavigation: FC<ButtonNavigationProps> = ({
  activePage,
  onChangePageHandler,
  children,
  color,
}) => {
  const clickNumPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const goToNumberGroupPage = Number((event.target as Element).innerHTML);
    onChangePageHandler(goToNumberGroupPage - 1);
  };

  const styleProps = { backgroundColor: color, activePage };
  const classes = useStyles(styleProps);

  return (
    <Fab
      onClick={clickNumPage}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Fab>
  );
};
