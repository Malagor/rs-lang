import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_WHITE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  countdownPosition: {
    position: 'absolute',
    top: '0',
    left: '0',
    margin: '80px',
  },
  pointsWrapper: {
    margin: 'auto',
    padding: '0 0 60px 0',
  },
  points: {
    color: COLOR_LAYOUT_WHITE,
  },
  indicatorPanel: {
    display: 'flex',
    margin: 'auto',
  },
  indicatorImg: {
    width: '20px',
    height: '18px',
    margin: theme.spacing(1),
  },
  indicatorImgInactive: {
    opacity: '0.3',
  },
  multiplier: {
    color: COLOR_LAYOUT_WHITE,
    textAlign: 'center',
  },
}));
