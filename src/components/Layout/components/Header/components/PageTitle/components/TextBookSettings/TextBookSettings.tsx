import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { LocStore } from 'services';
import {
  selectIsButtonsShown,
  selectIsTranslationShown,
} from 'modules/TextBookPage/selectors';
import { selectUser } from 'modules/Login/selectors';
import {
  setIsButtonsShown,
  setIsTranslationShown,
} from 'modules/TextBookPage/actions';
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
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
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

export const TextBookSettings: React.FC = () => {
  const isTranslationShown = useSelector(selectIsTranslationShown);
  const isButtonsShown = useSelector(selectIsButtonsShown);
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [translation, setTranslation] = useState(isTranslationShown);
  const [buttons, setButtons] = useState(isButtonsShown);
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
    setButtons(isButtonsShown);
    setTranslation(isTranslationShown);
  };

  const saveChanges = () => {
    dispatch(setIsButtonsShown(buttons));
    dispatch(setIsTranslationShown(translation));
    setOpen(false);
    LocStore.setTextBookSettings({
      isButtonsShown: buttons,
      isTranslationShown: translation,
    });
  };

  useEffect(() => {
    const settings = LocStore.getTextBookSettings() || {};
    dispatch(setIsButtonsShown(settings.isButtonsShown ?? true));
    dispatch(setIsTranslationShown(settings.isTranslationShown ?? true));
  }, [dispatch]);

  return (
    <div>
      <SettingsIcon
        onClick={handleClickOpen}
        style={iconStyles}
        titleAccess="Settings"
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ root: classes.dialog }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Settings
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isLogin ? buttons : false}
                  onChange={handleShowButtons}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Show buttons"
              labelPlacement="start"
              disabled={!isLogin}
              classes={{ root: classes.item, label: classes.label }}
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
              classes={{ root: classes.item, label: classes.label }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions classes={{ root: classes.footer }}>
          <button
            onClick={saveChanges}
            className={classes.button}
            type="button"
          >
            save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
