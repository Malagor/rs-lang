import React, { MouseEvent, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsButtons,
  selectIsTranslate,
} from 'modules/TextBookPage/selectors';
import { selectUser } from 'modules/Login/selectors';
import { setIsButtons, setIsTranslate } from 'modules/TextBookPage/actions';
import { iconStyles } from '../../styled';
import { useStyles, styles } from './styled';

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
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const TextBookSettings: React.FC = () => {
  const isTranslate = useSelector(selectIsTranslate);
  const isButtons = useSelector(selectIsButtons);
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [translation, setTranslation] = useState(isTranslate);
  const [buttons, setButtons] = useState(isButtons);
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLogin = !!user.id;

  const handleShowButtons = () => {
    setButtons((prev) => !prev);
  };

  const handleShowTranslation = () => {
    setTranslation((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setButtons(isButtons);
    setTranslation(isTranslate);
  };

  const saveChanges = () => {
    dispatch(setIsButtons(buttons));
    dispatch(setIsTranslate(translation));
    setOpen(false);
  };

  return (
    <div>
      <SettingsIcon
        style={iconStyles}
        titleAccess="Settings"
        onClick={handleClickOpen}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Textbook settings
        </DialogTitle>
        <DialogContent dividers>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={buttons}
                  onChange={handleShowButtons}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Show buttons"
              labelPlacement="start"
              disabled={!isLogin}
              className={classes.root}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={translation}
                  onChange={handleShowTranslation}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Show translation"
              labelPlacement="start"
              className={classes.root}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={saveChanges} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
