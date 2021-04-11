import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_LIGHT_GRAY } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1000px',
    margin: `0 auto  ${theme.spacing()}px`,
  },
  wrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '400px',
      width: '100%',
    },
  },
  title: {
    margin: `0 0 ${theme.spacing(4)}px`,
    fontSize: '35px',
    lineHeight: '100%',
    fontWeight: 400,
    color: COLOR_LAYOUT_LIGHT_GRAY,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    '&:not(:first-child)': {
      marginTop: `${theme.spacing(7)}px`,
    },
  },
}));
