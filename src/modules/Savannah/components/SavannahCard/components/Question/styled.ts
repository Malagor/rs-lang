import styled, { keyframes } from 'styled-components/macro';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const QuestionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 500px;
  border-bottom: 1px solid #eafff2;
`;

const letterSpacing = keyframes`
  from {
  //opacity: 1;
    letter-spacing: 0;
  }
  to {
  //opacity: 0;
    letter-spacing: 100px;
  }
`;

const slidedown = keyframes`
  0% {
    //opacity: 1;
    top: 0;
  }
  100% {
    top: 500px;
    //opacity: 1;
  }
`;

export const CurrentWord = styled.div<{ topPosition: number }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 35px;
  color: ${COLOR_LAYOUT_BACKGROUND};
  opacity: 0;
`;
// top: ${({ topPosition }) => topPosition || 0}px;
// transition: top 0.5s linear;
