import React, { FC } from 'react';
import clsx from 'clsx';
import { Toolbar, IconButton, AppBar, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { MIDDLE_SCREEN_WIDTH } from 'appConstants';
import { useIsMobile } from 'hooks/useIsMobile';
import { selectUser } from 'modules/Login/selectors';
import { PageTitle, UserInfoBlock, LoginModal } from './components';
import { useStyles } from './styled';

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

export const Header: FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  const isMobile = useIsMobile();
  const isMiddleScreen = useMediaQuery(`(max-width:${MIDDLE_SCREEN_WIDTH}px)`);
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
        <PageTitle hidden={isMiddleScreen && open && !isMobile} />
        <div className={classes.grow} />
        {user.name ? <UserInfoBlock /> : <LoginModal />}
      </Toolbar>
    </AppBar>
  );
};
