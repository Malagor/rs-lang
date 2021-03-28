import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: '888px',
    maxHeight: '842px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '808px',
      maxHeight: '754px',
    },
  },
}));
