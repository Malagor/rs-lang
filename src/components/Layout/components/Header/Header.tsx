import React, { FC } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { MOBILE_WIDTH } from 'appConstants';
import { useStyles } from './styled';
import { PageTitle } from './components';
import { COLOR_LAYOUT_GRAY } from '../../../../appConstants/colors';

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

export const Header: FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  const isMobile = window.document.body.offsetWidth < MOBILE_WIDTH;

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
        <PageTitle />
        <div className={classes.grow} />

        <Typography className={classes.marginLeft}>Вася пупкин</Typography>
        <Avatar alt="" src="" className={classes.marginLeft} />
      </Toolbar>
    </AppBar>
  );
};
