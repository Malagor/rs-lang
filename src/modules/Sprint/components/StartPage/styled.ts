import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_DARKBLUE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  wrapperForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4, 0),
  },
  title: {
    margin: 'auto',
  },
  description: {
    maxWidth: '600px',
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  legend: {
    margin: 'auto',
  },
  levelBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonColor: {
    backgroundColor: COLOR_LAYOUT_DARKBLUE,
  },
}));
