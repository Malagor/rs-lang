import { lighten, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_WHITE,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_GRAY,
} from 'appConstants/colors';

interface StyleProps {
  backgroundColor: string;
  activePage: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: (props) => ({
    width: '40px',
    height: '40px',
    margin: '12px',
    fontSize: '18px',
    color: COLOR_LAYOUT_BACKGROUND,

    backgroundColor: props.backgroundColor,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      background: props.activePage
        ? props.backgroundColor
        : lighten(props.backgroundColor, 0.2),
      borderRadius: '50%',
    },
  }),
  label: (props) => ({
    position: 'absolute',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: props.activePage ? `3px solid ${props.backgroundColor}` : 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: '0.1s border',
    '&:hover': {
      boxShadow: 'none',
      colors: props.activePage ? 'default' : 'pointer',
    },
  }),
}));
