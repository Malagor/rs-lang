import React, { useEffect, useRef } from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useDispatch } from 'react-redux';
import { setRefStatistic } from 'modules/TextBookPage/actions';
import { DialogTitle, ModalContent } from './components';

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
