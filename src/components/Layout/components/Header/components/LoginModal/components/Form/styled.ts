import { makeStyles } from '@material-ui/core/styles';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  button: {
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
}));
