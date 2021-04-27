import { makeStyles } from '@material-ui/core/styles';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '6px auto 16px;',
  },
  wrapperLoader: {
    margin: '32px auto 40px',
  },
  avatar: {
    width: '54px',
    height: '54px',
    marginRight: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
}));
