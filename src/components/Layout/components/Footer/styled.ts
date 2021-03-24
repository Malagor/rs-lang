import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_YELLOW } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(1),
    marginTop: 'auto',
    backgroundColor: COLOR_LAYOUT_YELLOW,
  },
  nameApp: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  authorsWrapper: {
    display: 'flex',
    order: 2,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      textAlign: 'center',
      order: 3,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  authorsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      order: 3,
    },
  },
  logoSchool: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    order: 0,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      order: 0,
    },
  },
  imageSchool: {
    width: '55px',
    height: '20px ',
    backgroundRepeat: 'no-repeat',
  },
  gtiLogoImg: {
    width: '12px',
    margin: '3px',
  },
  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));
