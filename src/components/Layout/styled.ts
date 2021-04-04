import makeStyles from '@material-ui/core/styles/makeStyles';
import { MIDDLE_SCREEN_WIDTH, MOBILE_WIDTH } from 'appConstants';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [`@media (max-width:${MIDDLE_SCREEN_WIDTH}px)`]: {
      paddingLeft: `${theme.spacing(11)}px`,
    },
    [`@media (max-width:${MOBILE_WIDTH}px)`]: {
      paddingLeft: 0,
    },
  },
  content: {
    flexGrow: 1,
    paddingTop: `${theme.spacing(4)}px`,
    paddingBottom: `${theme.spacing(4)}px`,
    [theme.breakpoints.down('md')]: {
      paddingTop: `${theme.spacing(3)}px`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${theme.spacing(2)}px`,
    },
  },
}));
