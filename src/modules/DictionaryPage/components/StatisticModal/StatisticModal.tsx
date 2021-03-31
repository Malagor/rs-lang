import React, { useRef } from 'react';
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
import Typography from '@material-ui/core/Typography';
import TimelineIcon from '@material-ui/icons/Timeline';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

export const StatisticModal = () => {
  const [open, setOpen] = React.useState(false);
  const refOpenStatistic = useRef<HTMLButtonElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const iconStyles = { fontSize: '2rem', cursor: 'pointer' };

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
      <TimelineIcon
        onClick={() => refOpenStatistic.current?.click()}
        style={iconStyles}
      />

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Page
        </DialogTitle>

        <DialogContent dividers>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            quibusdam perferendis esse facere eos, accusamus similique
            laudantium, aliquam laborum amet itaque repudiandae vitae fugit,
            recusandae est commodi. Soluta accusantium ut ducimus illo
            voluptates hic iste ad pariatur cupiditate, earum incidunt
            reiciendis consectetur sint dolorem delectus fuga. Rem culpa tempora
            architecto facere eligendi sed perspiciatis illo sequi minus laborum
            pariatur atque, ad, consectetur excepturi sint nam enim voluptas
            magni assumenda quae eius unde provident. Iste soluta autem
            eligendi, maxime, at deleniti ducimus obcaecati asperiores quis sunt
            quo. Nesciunt, aliquam voluptatibus! Sed doloremque cumque ex
            dignissimos consectetur eligendi provident libero, veritatis cum!
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
