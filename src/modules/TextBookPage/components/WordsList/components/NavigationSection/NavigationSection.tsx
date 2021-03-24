import React, { FC } from 'react';
import { NUMBER_OF_PAGE } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectPage } from './selectors';
import { ButtonNavigation } from './components';
import { NavigationPosition } from './styled';

type NavigationSectionProps = {
  changeGroupPage: Function;
};

export const NavigationSection: FC<NavigationSectionProps> = ({
  changeGroupPage,
}) => {
  const arrayNumberOfPage = Array.from({ length: NUMBER_OF_PAGE }, (v, k) => k);

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
        style={{ width: '72px', height: '400px', padding: '4px 0' }}
      >
        {arrayNumberOfPage.map((numberPage: number, index: number) => (
          <Grid key={numberPage} container justify="center">
            <ButtonNavigation
              onChangePage={onChangePage}
              numberPage={numberPage}
              pageNow={pageNow}
              color={LEVEL_COLORS[index]}
            >
              {numberPage + 1}
            </ButtonNavigation>
          </Grid>
        ))}
      </Paper>
    </NavigationPosition>
  );
};
