import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '72px',
    margin: '0 auto',

    [theme.breakpoints.down('xs')]: {
      position: 'none',
      top: '0',
      width: '98%',
      transform: 'none',
      margin: theme.spacing(1),
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
  paperWrapper: {
    padding: '5px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  titleWrapper: {
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto 0',
    },
  },
  title: {
    transform: '',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      fontWeight: 400,
      writingMode: 'vertical-lr',
      transform: 'rotate(180deg)',
    },
  },
  containerWrapper: {},
}));
