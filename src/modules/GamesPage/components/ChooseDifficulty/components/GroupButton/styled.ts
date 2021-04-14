import { makeStyles, lighten, darken } from '@material-ui/core/styles';
import { COLOR_LAYOUT_BACKGROUND, LEVEL_COLORS } from 'appConstants/colors';

export const useStyles = makeStyles(() => ({
  groupButton: ({ group }: { group: number }) => ({
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '50%',
    outline: 'none',
    backgroundColor: LEVEL_COLORS[group],
    '&:hover': {
      backgroundColor: lighten(LEVEL_COLORS[group], 0.2),
    },
    '&:active': {
      backgroundColor: darken(LEVEL_COLORS[group], 0.2),
    },
    cursor: 'pointer',
  }),
  groupNumber: {
    fontSize: '18px',
    lineHeight: '21px',
    fontWeight: 700,
    color: COLOR_LAYOUT_BACKGROUND,
  },
}));
