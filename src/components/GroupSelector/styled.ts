import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      position: 'none',
      top: '0',
      transform: 'none',
      margin: '8px',
    },
  },
  groupSelectorPosition: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 10px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textPosition: {
    textAlign: 'center',
    fontWeight: 600,
  },
  paperWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
}));
