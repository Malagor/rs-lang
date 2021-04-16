import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
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
    fontSize: '14px',
    color: COLOR_LAYOUT_BACKGROUND,
  },
  wrapperPaper: {
    margin: theme.spacing(4, 0, 3),
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
    width: '56px',
    height: '8px',
    marginTop: theme.spacing(3),
  },

  indicator: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: COLOR_LAYOUT_BLUE,
  },
  indicatorActive: {
    backgroundColor: COLOR_LAYOUT_GRAY,
  },

  wrapperWords: {
    margin: theme.spacing(3),
  },
  englishWord: {
    textAlign: 'center',
    fontSize: '22px',
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
  background-color: ${({ isRightAnswerButton }) =>
    isRightAnswerButton ? COLOR_LAYOUT_BLUE : COLOR_LAYOUT_DARK_GRAY};
  &:hover {
    background-color: ${({ isRightAnswerButton }) =>
      isRightAnswerButton
        ? lighten(COLOR_LAYOUT_BLUE, 0.2)
        : lighten(COLOR_LAYOUT_DARK_GRAY, 0.2)};
  }
`;
