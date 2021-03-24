import React, { FC } from 'react';

import Fab from '@material-ui/core/Fab';

import { useStyles } from './styled';

type ButtonNavigationProps = {
  numberPage: number;
  pageNow: number;
  onChangePage: Function;
  children: number;
};

interface MyComponentProps {}

export const ButtonNavigation: FC<ButtonNavigationProps> = ({
  numberPage,
  pageNow,
  onChangePage,
  children,
}) => {
  const clickNumPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    console.log('event', event.target);
    const goToNumberPage = Number((event.target as Element).innerHTML);
    console.log('clickNumPage ', goToNumberPage);
    onChangePage(goToNumberPage - 1);
  };

  const activePage: boolean = pageNow === numberPage;

  const styleProps = { backgroundColor: 'blue', activePage };
  const classes = useStyles(styleProps);

  return (
    <Fab
      onClick={clickNumPage}
      id={String(numberPage)}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </Fab>

    /*     <StyleLink
      activePage={activePage}
      id={String(numberPage)}
      href="#"
      onClick={clickNumPage}
    >
      {numberPage + 1}
    </StyleLink> */
  );
};
