import { Theme } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

interface PlayButtonProps {
  colorButton: string;
}

export const PlayButton = withStyles((theme) => ({
  root: (props) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderColor: 'none',
    fontFamily: ['Roboto'].join(','),
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  }),
}))(Button);

export const useStyles = makeStyles<Theme, PlayButtonProps>((theme) => ({
  root: (props) => ({
    color: COLOR_LAYOUT_BACKGROUND,
    backgroundColor: `${props.colorButton}`,
    borderColor: `${props.colorButton}`,
    '&:hover': {
      backgroundColor: `${props.colorButton} 0.1`,
      borderColor: `${props.colorButton} 0.1`,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: `${props.colorButton} 0.5`,
      borderColor: `${props.colorButton} 0.5`,
    },
  }),
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  cardWrapper: {
    width: '363px',
    MinHeight: '308px',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  avatarWrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  titleWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  descriptionWrapper: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    textAlign: 'center',
  },
  buttonWrapper: {
    top: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));
