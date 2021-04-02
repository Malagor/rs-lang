import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_DARKBLUE,
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_TEXT,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    overflow: 'hidden',
    ...theme.mixins.toolbar,
  },
  appBar: {
    position: 'static',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: COLOR_LAYOUT_TEXT,
    boxShadow: 'none',
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    position: 'fixed',
    left: '20px',
    zIndex: theme.zIndex.drawer + 1,
    color: COLOR_LAYOUT_GRAY,
  },
  menuButtonHidden: {
    display: 'none',
  },
  menuButtonMobile: {
    position: 'relative',
    left: 0,
    marginRight: `${theme.spacing()}px`,
    color: COLOR_LAYOUT_DARKBLUE,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  grow: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: 10,
  },
}));
