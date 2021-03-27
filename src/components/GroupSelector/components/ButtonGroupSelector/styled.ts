import { Theme } from '@material-ui/core';
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
  root: (props) => {
    if (props.activePage) {
      return {
        width: '56px',
        height: '56px',
        margin: '8px',
        border: `3px solid ${props.backgroundColor}`,
        fontSize: '18px',
        color: COLOR_LAYOUT_BACKGROUND,

        backgroundColor: COLOR_LAYOUT_WHITE,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: COLOR_LAYOUT_WHITE,
          borderRadius: '50%',
        },
      };
    }
    return {
      width: '40px',
      height: '40px',
      margin: '12px',
      fontSize: '18px',
      color: COLOR_LAYOUT_BACKGROUND,

      backgroundColor: props.backgroundColor,
      boxShadow: 'none',
      '&:hover': {
        background: COLOR_LAYOUT_GRAY,
        borderRadius: '50%',
      },
    };
  },
  label: (props) => {
    if (props.activePage) {
      return {
        width: '40px',
        height: '40px',
        borderRadius: '50%',

        backgroundColor: props.backgroundColor,
        boxShadow: 'none',
        '&:hover': {
          background: COLOR_LAYOUT_GRAY,
          borderRadius: '50%',
        },
      };
    }
    return {
      height: '100%',
      boxShadow: 'none',
      '&:hover': {
        background: COLOR_LAYOUT_GRAY,
        borderRadius: '50%',
      },
    };
  },
}));
