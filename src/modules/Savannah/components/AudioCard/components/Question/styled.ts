import styled, { keyframes } from 'styled-components/macro';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const QuestionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
`;

const slidedown = keyframes`
  from {
    top: 0
  }
  to {
    top: 500px
  }
`;

export const CurrentWord = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 35px;
  color: ${COLOR_LAYOUT_BACKGROUND};
  animation: ${slidedown} 3s linear normal;
`;
