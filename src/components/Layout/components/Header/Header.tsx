import React, { FC } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import { MOBILE_WIDTH } from 'appConstants';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';
import { PageTitle, UserInfoBlock, LoginModal } from './components';
import { useStyles } from './styled';

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

export const Header: FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  const isMobile = window.innerWidth < MOBILE_WIDTH;
  const user = useSelector(selectUser);

  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && !isMobile && classes.appBarShift)}
      color="transparent"
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            !isMobile && open && classes.menuButtonHidden,
            isMobile && classes.menuButtonMobile
          )}
        >
          <MenuIcon />
        </IconButton>
        <PageTitle />
        <div className={classes.grow} />
        {user.name ? <UserInfoBlock /> : <LoginModal />}
      </Toolbar>
    </AppBar>
  );
};
