import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: '888px',
    minHeight: '842px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '808px',
      minHeight: '754px',
    },
  },
}));
