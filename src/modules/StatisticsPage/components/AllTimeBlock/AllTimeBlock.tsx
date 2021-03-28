import React, { FC } from 'react';
import { Container, Paper } from '@material-ui/core';

export const AllTimeBlock: FC = () => {
  console.log('all time');

  return (
    <Container>
      <Paper>Today</Paper>
      <Paper>All time</Paper>
    </Container>
  );
};
