import React, { FC } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import { MOBILE_WIDTH } from 'appConstants';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/Login/selectors';
import { ContentWrapperFlex } from 'styles';
import { PageTitle, UserInfoBlock, LoginModal } from './components';
import { useStyles } from './styled';

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

export const Header: FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  const isMobile = window.document.body.offsetWidth < MOBILE_WIDTH;
  const user = useSelector(selectUser);

  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && !isMobile && classes.appBarShift)}
      color="transparent"
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          style={{ color: COLOR_LAYOUT_GRAY }}
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <ContentWrapperFlex>
          <PageTitle />
          <div className={classes.grow} />
          {user.name ? <UserInfoBlock /> : <LoginModal />}
        </ContentWrapperFlex>
      </Toolbar>
    </AppBar>
  );
};
