import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { COLOR_LAYOUT_DARK_GRAY } from 'appConstants/colors';

export const useStyles = makeStyles<Theme>((theme) => ({
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
