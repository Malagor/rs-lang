import { createStyles, lighten, Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_TEXT,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_GRAY,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: '10px',
  },
  content: {
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(
      2
    )}px`,
  },
  item: {
    width: 235,
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  label: {
    color: COLOR_LAYOUT_TEXT,
    fontSize: '16px',
    lineHeight: 1.5,
  },
  button: {
    padding: `${theme.spacing()}px ${theme.spacing(5)}px`,
    background: COLOR_LAYOUT_BLUE,
    color: COLOR_LAYOUT_BACKGROUND,
    borderRadius: 0,
    outline: 'none',
    border: 'none',
    fontSize: '16px',
    lineHeight: 1.5,
    cursor: 'pointer',
    transition: theme.transitions.create('background-color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      background: lighten(COLOR_LAYOUT_BLUE, 0.2),
    },
  },
  footer: {
    padding: `0 ${theme.spacing(4)}px ${theme.spacing(2)}px`,
    justifyContent: 'flex-start',
  },
}));

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
      borderBottom: `3px solid ${COLOR_LAYOUT_GRAY}`,
    },
    title: {
      fontSize: '22px',
      lineHeight: 1,
      fontWeight: 400,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(3) - 12,
      top: theme.spacing(2) - 12,
      color: COLOR_LAYOUT_GRAY,
    },
  });
