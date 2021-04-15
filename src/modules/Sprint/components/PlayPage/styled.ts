import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARK_GRAY,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperPoints: {
    textAlign: 'center',
  },
  points: {
    fontSize: '35px',
    color: COLOR_LAYOUT_BACKGROUND,
  },
  pointsAdd: {
    fontSize: '14px',
    color: COLOR_LAYOUT_BACKGROUND,
  },
  wrapperPaper: {
    margin: theme.spacing(4, 0, 3),
  },
  paperSize: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '329px',
    height: '198px',
  },
  wrapperIndicator: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '56px',
    height: '8px',
    marginTop: theme.spacing(3),
  },

  indicator: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
  indicatorActive: {
    backgroundColor: COLOR_LAYOUT_GRAY,
  },

  wrapperWords: {
    margin: theme.spacing(3),
  },
  englishWord: {
    textAlign: 'center',
    fontSize: '22px',
  },
  translatedWord: {
    textAlign: 'center',
    fontSize: '16px',
  },
  wrapperButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  buttons: {
    width: '112px',
    height: '40px',
    margin: '0 12px',
  },
  right: {
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
  wrong: {
    backgroundColor: COLOR_LAYOUT_DARK_GRAY,
  },
}));
