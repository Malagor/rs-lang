import React, { FC } from 'react';
import { COUNT_GROUPS } from 'appConstants/index';
import { LEVEL_COLORS } from 'appConstants/colors';

import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup } from 'modules/TextBookPage/actions';
import { selectGroup } from 'store/commonState/selectors';
import { ButtonGroupSelector } from './components';
import { GroupSelectorPosition, TitleGroupSelector } from './styled';

export const GroupSelector: FC = () => {
  const dispatch = useDispatch();
  const arrayNumberOfPage = Array.from({ length: COUNT_GROUPS }, (v, k) => k);

  const groupPageNow = useSelector(selectGroup);

  const onChangeGroupPageHandler = (numberGroupPage: number) => {
    dispatch(setGroup(numberGroupPage));
  };

  const colorText = LEVEL_COLORS[groupPageNow];

  return (
    <GroupSelectorPosition>
      <Paper elevation={3} style={{ color: `${colorText}` }}>
        <TitleGroupSelector>Groups</TitleGroupSelector>
        {arrayNumberOfPage.map((numberGroupPage: number) => (
          <Grid key={numberGroupPage} container justify="center">
            <ButtonGroupSelector
              onChangeGroupPageHandler={() =>
                onChangeGroupPageHandler(numberGroupPage)
              }
              activePage={numberGroupPage === groupPageNow}
              color={LEVEL_COLORS[numberGroupPage]}
            >
              {numberGroupPage + 1}
            </ButtonGroupSelector>
          </Grid>
        ))}
      </Paper>
    </GroupSelectorPosition>
  );
};
