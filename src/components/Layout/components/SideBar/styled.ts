import makeStyles from '@material-ui/core/styles/makeStyles';
import { DRAWER_WIDTH, MIDDLE_SCREEN_WIDTH } from 'appConstants';
import { COLOR_LAYOUT_DARKBLUE, COLOR_LAYOUT_GRAY } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    marginLeft: '12px',
    marginRight: '12px',
    color: COLOR_LAYOUT_GRAY,
    overflow: 'hidden',
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
    [`@media (max-width:${MIDDLE_SCREEN_WIDTH}px)`]: {
      position: 'fixed',
    },
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
  closeButton: {
    color: COLOR_LAYOUT_GRAY,
    marginRight: `${theme.spacing()}px`,
  },
}));
