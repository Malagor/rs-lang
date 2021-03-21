import React from 'react';
import { APP_NAME } from 'appConstants';
import classes from './App.module.scss';

export function App() {
  return <div className={classes.app}>{APP_NAME}</div>;
}
