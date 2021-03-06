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
    flexGrow: 1,
    paddingTop: `${theme.spacing(5)}px`,
    paddingBottom: `${theme.spacing(5)}px`,
    [theme.breakpoints.down('md')]: {
      paddingTop: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: `${theme.spacing(5)}px`,
    },
  },
  gamesContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
