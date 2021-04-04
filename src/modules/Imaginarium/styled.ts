import styled from 'styled-components/macro';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { fade } from '@material-ui/core';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_WHITE,
  COLOR_LAYOUT_YELLOW,
} from 'appConstants/colors';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

export const GameContainer = styled.div<{ breakpoints: Breakpoints }>`
  position: relative;
  display: grid;
  grid-gap: 20px;
  align-content: center;
  justify-content: stretch;
  min-height: calc(100vh - 84px);
  padding: 20px;
  background: linear-gradient(180deg, #5b3085 0%, #b7498a 100%);

  ${(props) => props.breakpoints.down('xs')} {
    min-height: calc(100vh - 76px);
  }
`;

export const GameField = styled.div<{ breakpoints: Breakpoints }>`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, auto);
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;

  ${(props) => props.breakpoints.down('md')} {
    grid-template-columns: repeat(3, 200px);
  }

  ${(props) => props.breakpoints.down('sm')} {
    grid-template-columns: repeat(3, 160px);
  }

  ${(props) => props.breakpoints.down('xs')} {
    grid-gap: 10px;
    grid-template-columns: repeat(2, 140px);
  }
`;

export const QuizWordContainer = styled.div<{ breakpoints: Breakpoints }>`
  grid-row: 2;
  grid-column: 2;
  color: ${COLOR_LAYOUT_BACKGROUND};
  font-size: 2rem;

  ${(props) => props.breakpoints.down('sm')} {
    font-size: 1.6rem;
  }

  ${(props) => props.breakpoints.down('xs')} {
    grid-row: 3;
    grid-column: 1 / span 2;
  }
`;

export const PronounceButton = styled(VolumeUpIcon)`
  width: 72px;
  height: 72px;
  background: rgba(250, 252, 254, 0.3);
  border-radius: 50%;
  padding: 17px;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background: ${COLOR_LAYOUT_BACKGROUND};
    color: #5b3085;
  }
`;
