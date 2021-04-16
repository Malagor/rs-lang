import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LEVEL_1,
  COLOR_LAYOUT_DARK_GRAY,
} from 'appConstants/colors';
import styled from 'styled-components';
import { Button, lighten } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperPoints: {
    textAlign: 'center',
  },
  points: {
    fontSize: '35px',
    color: COLOR_LAYOUT_BACKGROUND,
  },
  pointsAdd: {
    fontSize: '22px',
    color: COLOR_LAYOUT_BACKGROUND,
  },
  changeColor: {
    animation: '$blink 120ms infinite',
    color: COLOR_LEVEL_1,
  },
  '@keyframes blink': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.1,
    },
  },
  wrapperPaper: {
    margin: theme.spacing(3, 0),
  },
  paperSize: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '329px',
    height: '198px',
    borderRadius: '10px',
  },
  wrapperIndicator: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '56px',
    marginTop: theme.spacing(1),
  },

  indicator: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    margin: '4px',
    backgroundColor: COLOR_LEVEL_1,
  },
  indicatorInactive: {
    backgroundColor: COLOR_LAYOUT_GRAY,
  },

  wrapperWords: {
    margin: theme.spacing(5, 0, 3, 0),
  },
  englishWord: {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: theme.spacing(1),
  },
  translatedWord: {
    textAlign: 'center',
    fontSize: '16px',
  },
  wrapperButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
}));

export const ModeAnswerButton = styled(Button)<{
  isRightAnswerButton?: boolean;
}>`
  width: 112px;
  height: 40px;
  margin: 0 12px;
  border-radius: 0;
  text-transform: none;
  background-color: ${({ isRightAnswerButton }) =>
    isRightAnswerButton ? COLOR_LEVEL_1 : COLOR_LAYOUT_DARK_GRAY};
  &:hover {
    background-color: ${({ isRightAnswerButton }) =>
      isRightAnswerButton
        ? lighten(COLOR_LEVEL_1, 0.2)
        : lighten(COLOR_LAYOUT_DARK_GRAY, 0.2)};
  }
`;
