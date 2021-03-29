import React, { FC } from 'react';
import { Paper } from '@material-ui/core';

const style = {
  maxWidth: 400,
  margin: '0 auto',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
export const NoWordsMessage: FC = () => (
  <Paper style={style}>You have learned all the words on this page.</Paper>
);
