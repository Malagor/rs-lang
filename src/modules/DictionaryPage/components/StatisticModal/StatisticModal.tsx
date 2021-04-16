import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, ModalContent } from './components';

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: 'none',
  },
}))(MuiDialogContent);

export const StatisticModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const iconStyles = {
    fontSize: '2rem',
    cursor: 'pointer',
    margin: '8px 0 0 5px',
  };

  return (
    <div>
      <TimelineIcon
        style={iconStyles}
        titleAccess="Statistic"
        onClick={handleClickOpen}
      />

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Statistic
        </DialogTitle>

        <DialogContent dividers>
          <ModalContent />
        </DialogContent>
      </Dialog>
    </div>
  );
};
