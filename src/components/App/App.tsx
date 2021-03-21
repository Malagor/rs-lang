import React from 'react';
import classes from './App.module.scss';
import { APP_NAME } from 'appConstants';

export function App() {
  return (
    <div className={classes.app}>
      {APP_NAME}
    </div>
  );
}

