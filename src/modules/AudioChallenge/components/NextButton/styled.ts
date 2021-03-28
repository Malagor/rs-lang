import { lighten, makeStyles } from '@material-ui/core';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';

export const useStyles = makeStyles({
  root: {
    background: COLOR_LAYOUT_BLUE,
    border: 0,
    borderRadius: 0,
    color: 'white',
    height: 48,
    padding: '8px',
    width: 166,
    textTransform: 'lowercase',

    '&:hover': {
      background: lighten(COLOR_LAYOUT_BLUE, 0.1),
    },
  },
});
