import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { MOBILE_WIDTH } from 'appConstants';
import { Header, Footer, SideBar } from './components';
import { useStyles } from './styled';

export const Layout: FC = ({ children }) => {
  const isMobile = window.innerWidth < MOBILE_WIDTH;

  const classes = useStyles();
  const location = useLocation();

  const [open, setOpen] = React.useState(!isMobile);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <div className={clsx(classes.container, isMobile)}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <main className={classes.content}>{children}</main>
        {!location.pathname.includes('games') && <Footer />}
      </div>
    </div>
  );
};
