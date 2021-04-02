import { makeStyles } from '@material-ui/core';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const useStyles = makeStyles({
  root: {
    color: COLOR_LAYOUT_BACKGROUND,
    width: 0,
    height: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  checked: {
    width: 12,
    height: 12,
  },
  icon: {
    borderRadius: '50%',
    width: '12px',
    height: '12px',
  },
  disabled: {
    color: `${COLOR_LAYOUT_BACKGROUND} !important`,
  },
});
