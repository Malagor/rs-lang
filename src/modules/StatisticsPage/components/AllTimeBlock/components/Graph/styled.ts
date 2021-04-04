import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_WHITE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: '32%',
    marginBottom: `${theme.spacing(4)}px`,
    backgroundColor: COLOR_LAYOUT_WHITE,
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    '&:not(:last-child)': {
      marginRight: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      paddingTop: '63%',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: `${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(
      3
    )}px`,
  },
  title: {
    position: 'absolute',
    top: 0,
    left: '50%',
    margin: `${theme.spacing(2)}px 0`,
    transform: 'translate(-50%)',
    fontSize: '14px',
    fontWeight: 400,
  },
}));
