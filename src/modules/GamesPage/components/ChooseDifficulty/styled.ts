import { Theme } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';

import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_TEXT,
} from 'appConstants/colors';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '428px',
    paddingBottom: '100px',
  },
  gameNameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
  },
  backButton: ({ gameColor }: { gameColor: string }) => ({
    marginRight: '16px',
    backgroundColor: gameColor,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      backgroundColor: lighten(gameColor, 0.2),
    },
  }),
  backArrow: {
    color: COLOR_LAYOUT_BACKGROUND,
  },
  gameName: {
    margin: 0,
    fontSize: '40px',
    lineHeight: '40px',
    fontWeight: 700,
    color: COLOR_LAYOUT_TEXT,
  },
  selectHeader: {
    margin: 0,
    marginBottom: '32px',
    fontSize: '35px',
    lineHeight: '35px',
    fontWeight: 400,
    color: COLOR_LAYOUT_DARK_GRAY,
  },
  groupButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(2),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
  },
}));
