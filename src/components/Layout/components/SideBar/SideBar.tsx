import React, { FC } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { APP_NAME, MOBILE_WIDTH } from 'appConstants';
import { Typography } from '@material-ui/core';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { SideNav } from './components';
import { useStyles } from './styled';

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

export const SideBar: FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const isMobile = window.document.body.offsetWidth < MOBILE_WIDTH;

  const classes = useStyles();

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className={classes.toolbarIcon}>
        {open && (
          <>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon style={{ color: COLOR_LAYOUT_GRAY }} />
            </IconButton>
            <Typography variant="h5">{APP_NAME}</Typography>
          </>
        )}
      </div>
      <SideNav />
    </Drawer>
  );
};
