import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_DARKBLUE,
  COLOR_LAYOUT_TEXT,
  COLOR_LAYOUT_WHITE,
  COLOR_LAYOUT_LIGHT_GRAY,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_LAYOUT_WHITE,
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  },
  number: {
    margin: `0 ${theme.spacing(2)}px 0 0`,
    fontSize: '70px',
    fontWeight: 500,
    color: COLOR_LAYOUT_DARKBLUE,
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '35px',
    lineHeight: 1,
    fontWeight: 400,
    color: COLOR_LAYOUT_TEXT,
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    color: COLOR_LAYOUT_LIGHT_GRAY,
  },
}));
