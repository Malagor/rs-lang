import { lighten, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

interface StyleProps {
  backgroundColor: string;
  isActivePage: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: (props) => ({
    width: '40px',
    height: '40px',
    margin: '12px',
    minWidth: 0,
    minHeight: 0,
    fontSize: '18px',
    color: COLOR_LAYOUT_BACKGROUND,

    backgroundColor: props.backgroundColor,
    boxShadow: 'none',
    borderRadius: '50%',
    '&:hover': {
      boxShadow: 'none',
      background: props.isActivePage
        ? props.backgroundColor
        : lighten(props.backgroundColor, 0.2),
      borderRadius: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '35px',
      height: '35px',
      fontSize: '14px',
      lineHeight: '14px',
      margin: '6px',
    },
  }),
  label: (props) => ({
    position: 'absolute',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: props.isActivePage ? `3px solid ${props.backgroundColor}` : 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: '0.1s border',
    '&:hover': {
      boxShadow: 'none',
      colors: props.isActivePage ? 'default' : 'pointer',
    },
    [theme.breakpoints.down('xs')]: {
      width: '48px',
      height: '48px',
    },
  }),
}));
