import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_WHITE, COLOR_LAYOUT_TEXT } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '195px',
    gridRowEnd: 'span 2',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: COLOR_LAYOUT_WHITE,
    color: COLOR_LAYOUT_TEXT,
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  },
  header: {
    position: 'relative',
    paddingBottom: `${theme.spacing(2)}px`,
    marginBottom: `${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '4px',
      width: '72px',
      borderRadius: '10px',
      background: 'red',
    },
  },
  icon: {
    display: 'block',
    width: '40px',
    height: '40px',
    marginRight: `${theme.spacing(2)}px`,
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 500,
  },
  info: {
    fontSize: '22px',
    lineHeight: 1,
  },
  item: {
    marginBottom: `${theme.spacing()}px`,
  },
  value: {
    display: 'inline-block',
    minWidth: '64px',
    marginRight: `${theme.spacing()}px`,
  },
}));
