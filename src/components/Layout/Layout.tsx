import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MOBILE_WIDTH } from 'appConstants';
import { useBackgroundPage } from 'hooks/useBackgroundPage';
import { Header, Footer, SideBar } from './components';
import { useStyles } from './styled';

export const Layout: FC = ({ children }) => {
  const isMobile = window.document.body.offsetWidth < MOBILE_WIDTH;

  const classes = useStyles();
  const location = useLocation();

  const [open, setOpen] = React.useState(!isMobile);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const backgroundPage = useBackgroundPage();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main
        className={classes.content}
        style={{ backgroundImage: backgroundPage }}
      >
        <div
          className={classes.appBarSpacer}
          style={{ marginBottom: '20px' }}
        />
        {children}
        {!location.pathname.includes('games') && <Footer />}
      </main>
    </div>
  );
};
