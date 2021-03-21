import React, { FC } from 'react';
import classes from './Layout.module.scss';

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={classes.layout}>
    <h1>Layout</h1>
    <div className={classes.wrapper}>{children}</div>
    <footer className={classes.footer}>footer</footer>
  </div>
);
