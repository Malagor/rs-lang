import React, { FC } from 'react';
import { NUMBER_OF_PAGE } from 'appConstants/index';
import {
  COLOR_LEVEL_1,
  COLOR_LEVEL_2,
  COLOR_LEVEL_3,
  COLOR_LEVEL_4,
  COLOR_LEVEL_5,
  COLOR_LEVEL_6,
} from 'appConstants/colors';

import { Grid, Paper } from '@material-ui/core';
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
  const arrayNumberOfPage = Array.from({ length: NUMBER_OF_PAGE }, (v, k) => k);
  const arrayColorsLevel = [
    COLOR_LEVEL_1,
    COLOR_LEVEL_2,
    COLOR_LEVEL_3,
    COLOR_LEVEL_4,
    COLOR_LEVEL_5,
    COLOR_LEVEL_6,
  ];

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
              color={arrayColorsLevel[index]}
            >
              {numberPage + 1}
            </ButtonNavigation>
          </Grid>
        ))}
      </Paper>
    </NavigationPosition>
  );
};
