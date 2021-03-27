import makeStyles from '@material-ui/core/styles/makeStyles';
import { DRAWER_WIDTH } from 'appConstants';
import { COLOR_LAYOUT_DARKBLUE, COLOR_LAYOUT_GRAY } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    marginLeft: 12,
    color: COLOR_LAYOUT_GRAY,
    ...theme.mixins.toolbar,
  },

  drawerPaper: {
    position: 'sticky',
    maxHeight: '100vh',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: COLOR_LAYOUT_DARKBLUE,
    color: COLOR_LAYOUT_GRAY,
    overflowX: 'hidden',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(11),
    },
  },
  divided: {
    marginBottom: 20,
  },
}));
