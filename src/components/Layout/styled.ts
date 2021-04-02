import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    paddingTop: `${theme.spacing(4)}px`,
    [theme.breakpoints.down('md')]: {
      paddingTop: `${theme.spacing(3)}px`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${theme.spacing(2)}px`,
    },
  },
}));
