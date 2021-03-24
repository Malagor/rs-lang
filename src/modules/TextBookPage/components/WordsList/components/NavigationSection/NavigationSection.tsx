import { Grid } from '@material-ui/core';
import React, { FC } from 'react';

import Paper from '@material-ui/core/Paper';
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
  const arrayNumberOfPage = Array.from({ length: 6 }, (v, k) => k);

  const page = useSelector(selectPage);
  const [pageNow, setPageNow] = React.useState(page);

  const onChangePage = (numberPage: number) => {
    setPageNow(numberPage);
    changeGroupPage(numberPage);
  };

  return (
    <NavigationPosition>
      <Paper
        elevation={3}
        style={{ width: '72px', height: '392px', padding: '12px 0' }}
      >
        {arrayNumberOfPage.map((numberPage: number) => (
          <Grid key={numberPage} container justify="center">
            <ButtonNavigation
              onChangePage={onChangePage}
              numberPage={numberPage}
              pageNow={pageNow}
            >
              {numberPage + 1}
            </ButtonNavigation>
          </Grid>
        ))}
      </Paper>
    </NavigationPosition>
  );
};
