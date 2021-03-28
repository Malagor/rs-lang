import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_TEXT, COLOR_LAYOUT_WHITE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    gridRow: '2 / 5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: COLOR_LAYOUT_WHITE,
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: '35px',
    lineHeight: 1,
    margin: `0 0 ${theme.spacing(3)}px`,
    fontWeight: 400,
    color: COLOR_LAYOUT_TEXT,
  },
  progressBar: {
    width: '143px',
    height: '143px',
    backgroundColor: 'lightblue',
    borderRadius: '50%',
  },
}));
