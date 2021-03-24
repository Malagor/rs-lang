import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_ORANGE } from 'appConstants/colors';

export const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 32,
    minHeight: 48,

    '&$selected': {
      color: COLOR_LAYOUT_ORANGE,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        display: 'block',
        height: 32,
        width: 4,
        backgroundColor: COLOR_LAYOUT_GRAY,
      },
    },
  },
  selected: {},

  listIcon: {
    color: COLOR_LAYOUT_GRAY,
    minWidth: 56,
  },
  colorGray: {
    color: COLOR_LAYOUT_GRAY,
  },
}));
