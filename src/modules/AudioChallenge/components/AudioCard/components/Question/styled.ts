import styled from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BACKGROUND_RGB,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

export const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 250px;
  align-items: center;
`;

type HasAnswerProps = {
  hasAnsver?: boolean;
};
export const IconWrapper = styled.button<HasAnswerProps>`
  width: ${({ hasAnsver }) => (hasAnsver ? '40px' : '72px')};
  height: ${({ hasAnsver }) => (hasAnsver ? '40px' : '72px')};
  background-color: rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.3);
  color: ${COLOR_LAYOUT_WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.2);
  }

  svg {
    width: ${({ hasAnsver }) => (hasAnsver ? '18px' : '30px')};
    height: ${({ hasAnsver }) => (hasAnsver ? '18px' : '30px')};
  }
`;

export const ImageWrapper = styled.div<HasAnswerProps>`
  width: ${({ hasAnsver }) => (hasAnsver ? '100px' : '0px')};
  height: ${({ hasAnsver }) => (hasAnsver ? '100px' : '0px')};
  border-radius: 50%;
  overflow: hidden;
  transition: 0.1s;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;

export const CurrentWord = styled.p`
  font-size: 35px;
  line-height: 35px;
  color: ${COLOR_LAYOUT_BACKGROUND};
  margin-left: 16px;
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
`;
