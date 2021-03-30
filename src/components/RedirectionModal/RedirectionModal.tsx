import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { URL_MAIN_PAGE } from 'appConstants/url';
import STOP_IMG from 'assets/images/stop.png';
import { useStyles } from './styled';

export const RedirectionModal: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    history.push(URL_MAIN_PAGE);
  };

  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="redirect-dialog-title"
      aria-describedby="redirect-dialog-description"
      open={open}
      className={classes.wrapper}
    >
      <div className={classes.avatar}>
        <img src={STOP_IMG} className={classes.imgStyle} alt="STOP_IMG" />
      </div>

      <DialogTitle id="redirect-dialog-title">
        You do not have access to this page.
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="redirect-dialog-description">
          To access please login or register
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
