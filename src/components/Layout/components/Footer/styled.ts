import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_TEXT,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    marginTop: 'auto',
    backgroundColor: COLOR_LAYOUT_WHITE,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  },
  authors: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: `${theme.spacing(4)}px`,
    rowGap: '4px',
    [theme.breakpoints.down('xs')]: {
      columnGap: `${theme.spacing(2)}px`,
    },
  },
  imageSchool: {
    width: '90px',
    marginRight: `${theme.spacing(6)}px`,
    [theme.breakpoints.down('md')]: {
      marginRight: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: `${theme.spacing(2)}px`,
    },
    color: COLOR_LAYOUT_BLUE,
  },
  copyright: {
    marginLeft: `${theme.spacing(6)}px`,
    [theme.breakpoints.down('md')]: {
      marginLeft: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: `${theme.spacing(2)}px`,
    },
  },
  gitHubLink: {
    color: COLOR_LAYOUT_TEXT,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: COLOR_LAYOUT_BLUE,
    },
  },
}));
