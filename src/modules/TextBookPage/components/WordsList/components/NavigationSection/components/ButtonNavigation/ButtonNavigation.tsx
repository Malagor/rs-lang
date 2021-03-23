import React, { FC } from 'react';
import { StyleLink } from './styled';

type ButtonNavigationProps = {
  numberPage: number;
  pageNow: number;
  onChangePage: Function;
};

export const ButtonNavigation: FC<ButtonNavigationProps> = ({
  numberPage,
  pageNow,
  onChangePage,
}) => {
  const clickNumPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const goToNumberPage = Number((event.target as Element).id);
    console.log('clickNumPage ', goToNumberPage);
    onChangePage(goToNumberPage);
  };

  const activePage: boolean = pageNow === numberPage;
  console.log('activePage', activePage);

  return (
    <StyleLink
      activePage={activePage}
      id={String(numberPage)}
      href="#"
      onClick={clickNumPage}
    >
      {numberPage + 1}
    </StyleLink>
  );
};
