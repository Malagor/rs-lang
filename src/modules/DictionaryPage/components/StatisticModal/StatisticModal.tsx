import React, { useEffect, useRef } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { setRefStatistic } from 'modules/TextBookPage/actions';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { ModalContent } from './components';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 10,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: COLOR_LAYOUT_GRAY,
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: 'none',
  },
}))(MuiDialogContent);

export const StatisticModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const refOpenStatistic = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refOpenStatistic.current)
      dispatch(setRefStatistic(refOpenStatistic.current as HTMLButtonElement));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        ref={refOpenStatistic}
        style={{ display: 'none' }}
      >
        Open dialog
      </button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Statistic
        </DialogTitle>

        <DialogContent dividers style={{ paddingBottom: 30 }}>
          <ModalContent />
        </DialogContent>
      </Dialog>
    </div>
  );
};
