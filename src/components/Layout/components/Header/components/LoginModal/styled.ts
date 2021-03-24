import { makeStyles } from '@material-ui/core/styles';
import { COLOR_LAYOUT_BLUE, COLOR_LAYOUT_DARKBLUE } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
  openModalButton: {
    color: COLOR_LAYOUT_DARKBLUE,
  },
}));
