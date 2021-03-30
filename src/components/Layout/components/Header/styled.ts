import makeStyles from '@material-ui/core/styles/makeStyles';
import { DRAWER_WIDTH } from 'appConstants';
import { COLOR_LAYOUT_HEADER, COLOR_LAYOUT_TEXT } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: COLOR_LAYOUT_HEADER,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: COLOR_LAYOUT_TEXT,
    boxShadow: 'none',
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    marginLeft: -4,
  },
  menuButtonHidden: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: 10,
  },
  contentWrapper: {
    display: 'flex',
    maxWidth: '832px',
  },
}));
