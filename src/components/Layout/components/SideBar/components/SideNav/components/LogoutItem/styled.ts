import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';

export const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 32,
    minHeight: 48,
    marginTop: 'auto',
    marginBottom: 10,
  },

  listIcon: {
    color: COLOR_LAYOUT_GRAY,
    minWidth: 56,
  },
  colorGray: {
    color: COLOR_LAYOUT_GRAY,
  },
}));
