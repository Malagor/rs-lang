import { lighten, makeStyles, Theme } from '@material-ui/core';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';
import { gamesData } from 'appConstants/games';

type Props = {
  color?: 'primary' | 'secondary' | undefined;
};
const game = gamesData.find((v) => v.name === 'Audio challenge');

const gameColor = game ? game.color : COLOR_LAYOUT_BLUE;

export const useStyles = makeStyles<Theme, Props>({
  root: {
    backgroundColor: (props: Props) =>
      props.color === 'primary' ? COLOR_LAYOUT_BLUE : gameColor,
    border: 0,
    borderRadius: 0,
    color: 'white',
    height: 48,
    padding: '8px',
    width: 166,
    textTransform: 'lowercase',

    '&:hover': {
      background: (props: Props) =>
        props.color === 'primary'
          ? lighten(COLOR_LAYOUT_BLUE, 0.2)
          : lighten(gameColor, 0.2),
    },
  },
});
