import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_TEXT } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    gridRow: '2 / 5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: `${theme.spacing(2)}px`,
  },
  title: {
    fontSize: '16px',
    lineHeight: 1,
    margin: `${theme.spacing(3)}px 0 0`,
    fontWeight: 400,
    color: COLOR_LAYOUT_TEXT,
  },
  progressBar: {
    width: '112px',
    height: '112px',
  },
}));
