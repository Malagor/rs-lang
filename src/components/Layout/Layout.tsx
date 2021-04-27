import React, { FC } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useIsMobile } from 'hooks/useIsMobile';
import { URL_GAMES } from 'appConstants/url';
import { Header, Footer, SideBar } from './components';
import { useStyles } from './styled';

export const Layout: FC = ({ children }) => {
  const isMobile = useIsMobile();

  const classes = useStyles();
  const location = useLocation();

  const [open, setOpen] = React.useState(!isMobile);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isGamingPage = location.pathname.includes(URL_GAMES);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <div className={classes.container}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <main
          className={clsx(
            classes.content,
            isGamingPage && classes.gamesContent
          )}
        >
          {children}
        </main>
        {!isGamingPage && <Footer />}
      </div>
    </div>
  );
};
