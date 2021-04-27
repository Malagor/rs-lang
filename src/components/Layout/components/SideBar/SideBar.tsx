import React, { FC } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
import { APP_NAME } from 'appConstants';
import { useIsMobile } from 'hooks/useIsMobile';
import { SideNav } from './components';
import { useStyles } from './styled';

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

export const SideBar: FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const isMobile = useIsMobile();
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
        <>
          <IconButton
            style={{ opacity: open ? 1 : 0 }}
            className={classes.closeButton}
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5">{APP_NAME}</Typography>
        </>
      </div>
      <SideNav />
    </Drawer>
  );
};
