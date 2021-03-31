import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_YELLOW,
} from 'appConstants/colors';
import styled from 'styled-components';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 100px auto;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  color: ${COLOR_LAYOUT_BACKGROUND};
`;

export const AnswerStats = styled.p<{ breakpoints: Breakpoints }>`
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 24px;

  ${(props) => props.breakpoints.down('sm')} {
    font-size: 22px;
    line-height: 22px;
  }

  ${(props) => props.breakpoints.down('xs')} {
    font-size: 20px;
    line-height: 20px;
  }
`;

export const WrongWord = styled.span`
  color: ${COLOR_LAYOUT_ORANGE};
`;

export const RightWord = styled.span`
  color: ${COLOR_LAYOUT_YELLOW};
`;

export const InitialCountdownContainer = styled.div<{ gameIsStarted: boolean }>`
  z-index: 9;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ gameIsStarted }) => (gameIsStarted ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #5b3085 0%, #b7498a 100%);
`;
