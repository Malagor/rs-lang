import React, { FC } from 'react';
import { NUMBER_OF_GROUPS } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectGroup } from 'store/commonState/selectors';
import { ButtonNavigation } from './components';
import { NavigationPosition } from './styled';

type NavigationSectionProps = {
  changeGroupPage(numberPage: number): void;
};

export const NavigationSection: FC<NavigationSectionProps> = ({
  changeGroupPage,
}) => {
  const arrayNumberOfPage = Array.from(
    { length: NUMBER_OF_GROUPS },
    (v, k) => k
  );

  const groupPageNow = useSelector(selectGroup);

  const onChangePageHandler = (numberPage: number) => {
    changeGroupPage(numberPage);
  };

  return (
    <NavigationPosition>
      <Paper
        elevation={3}
        style={{ width: '72px', height: '400px', padding: '4px 0' }}
      >
        {arrayNumberOfPage.map((numberGroupPage: number, index: number) => (
          <Grid key={numberGroupPage} container justify="center">
            <ButtonNavigation
              onChangePageHandler={onChangePageHandler}
              activePage={numberGroupPage === groupPageNow}
              color={LEVEL_COLORS[index]}
            >
              {numberGroupPage + 1}
            </ButtonNavigation>
          </Grid>
        ))}
      </Paper>
    </NavigationPosition>
  );
};
