import { Grid } from '@material-ui/core';
import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { selectPage } from '../../../../selectors';

import { ButtonNavigation } from './components';
import { NavigationPosition } from './styled';

type NavigationSectionProps = {
  changeGroupPage: Function;
};

export const NavigationSection: FC<NavigationSectionProps> = ({
  changeGroupPage,
}) => {
  const numberOfPage = Array.from({ length: 6 }, (v, k) => k);

  const page = useSelector(selectPage);
  const [pageNow, setPageNow] = React.useState(page);

  const onChangePage = (numberPage: number) => {
    setPageNow(numberPage);
    changeGroupPage(numberPage);
  };

  return (
    <NavigationPosition>
      {numberOfPage.map((numberPage: number) => (
        <Grid key={numberPage}>
          <ButtonNavigation
            onChangePage={onChangePage}
            numberPage={numberPage}
            pageNow={pageNow}
          />
        </Grid>
      ))}
    </NavigationPosition>
  );
};
