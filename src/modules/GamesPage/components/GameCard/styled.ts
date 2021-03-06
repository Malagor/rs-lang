import { Theme } from '@material-ui/core';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

interface PlayButtonProps {
  colorButton: string;
}

export const PlayButton = withStyles((theme) => ({
  root: (props) => ({
    width: '110px',
    height: '40px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderColor: 'none',
    borderRadius: 'unset',
    fontFamily: 'Roboto',
  }),
}))(Button);

export const useStyles = makeStyles<Theme, PlayButtonProps>((theme) => ({
  root: (props) => ({
    color: COLOR_LAYOUT_BACKGROUND,
    backgroundColor: `${props.colorButton}`,
    borderColor: `${props.colorButton}`,
    '&:hover': {
      backgroundColor: lighten(`${props.colorButton}`, 0.2),
      borderColor: lighten(`${props.colorButton}`, 0.2),
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: lighten(`${props.colorButton}`, 0.2),
      borderColor: lighten(`${props.colorButton}`, 0.2),
    },
  }),
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  margin: {
    margin: theme.spacing(1),
  },
  cardWrapper: {
    width: '363px',
    minHeight: '308px',
    flexDirection: 'column',
    margin: '20px 20px',

    borderRadius: '10px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
  },
  avatarWrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  avatarSize: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: 'unset',
  },
  titleWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '24px',
    fontWeight: 500,
  },
  descriptionWrapper: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '150%',
  },
  buttonWrapper: {
    top: theme.spacing(4),
    marginTop: 'auto',
    marginBottom: theme.spacing(4),
  },
}));
