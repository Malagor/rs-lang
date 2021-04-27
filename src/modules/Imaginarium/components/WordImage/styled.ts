import styled, { keyframes, css } from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

const rightKeyframes = keyframes`
  0% {
    outline: none;
  }
  50% {
    outline: 10px solid ${COLOR_LAYOUT_BACKGROUND};
  }
  100% {
    outline: none;
  }
`;

const wrongKeyframes = keyframes`
  0% {
    outline: none;
  }
  50% {
    outline: 10px solid ${COLOR_LAYOUT_ORANGE};
  }
  100% {
    outline: none;
  }
`;

const rightAnimation = (animationTime: number) => css`
  ${rightKeyframes} ${animationTime / 3000}s linear 3 alternate;
`;

const wrongAnimation = (animationTime: number) => css`
  ${wrongKeyframes} ${animationTime / 3000}s linear 3 alternate;
`;

const chooseAnimation = (
  word: string,
  rightWord: string,
  wrongWord: string,
  animationTime: number
) => {
  if (word === rightWord) {
    return rightAnimation(animationTime);
  }
  if (word === wrongWord) {
    return wrongAnimation(animationTime);
  }
  return 'none';
};

export const WordImageContainer = styled.div<{
  number: number;
}>`
  position: relative;

  &::before {
    content: '${({ number }) => number.toString()}';
    position: absolute;
    bottom: 12px;
    left: 8px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    background-color: ${COLOR_LAYOUT_BLUE};
    color: ${COLOR_LAYOUT_WHITE};
    border-radius: 50%;
  }
`;

export const Image = styled.img<{
  word: string;
  rightWord: string;
  wrongWord: string;
  animationTime: number;
}>`
  max-width: 100%;
  max-height: 19vh;
  overflow: hidden;
  cursor: pointer;
  animation: ${({ word, rightWord, wrongWord, animationTime }) =>
    chooseAnimation(word, rightWord, wrongWord, animationTime)};
`;
