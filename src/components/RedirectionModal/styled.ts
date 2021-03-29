import { makeStyles } from '@material-ui/core/styles';
import { COLOR_LEVEL_1 } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
  },
  avatar: {
    width: '220px',
    margin: '16px auto',
  },
  imgStyle: {
    width: '220px',
  },
}));
