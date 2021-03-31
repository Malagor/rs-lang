import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  containerGrid: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  mainGrid: {
    order: 1,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
  sideGrid: {
    order: 2,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      order: 1,
    },
  },
  contentWrapper: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
}));
