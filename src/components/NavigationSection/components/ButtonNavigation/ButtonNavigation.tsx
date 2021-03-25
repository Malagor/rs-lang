import React, { FC } from 'react';
import Fab from '@material-ui/core/Fab';
import { useStyles } from './styled';

type ButtonNavigationProps = {
  numberPage: number;
  pageNow: number;
  onChangePageHandler: Function;
  children: number;
  color: string;
};

export const ButtonNavigation: FC<ButtonNavigationProps> = ({
  numberPage,
  pageNow,
  onChangePageHandler,
  children,
  color,
}) => {
  const clickNumPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const goToNumberPage = Number((event.target as Element).innerHTML);
    onChangePageHandler(goToNumberPage - 1);
  };

  const activePage: boolean = pageNow === numberPage;

  const styleProps = { backgroundColor: color, activePage };
  const classes = useStyles(styleProps);

  return (
    <Fab
      onClick={clickNumPage}
      id={String(numberPage)}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Fab>
  );
};
