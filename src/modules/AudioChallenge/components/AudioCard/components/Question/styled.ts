import styled from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND_RGB,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

export const QuestionWrapper = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

export const IconWrapper = styled.button`
  width: 72px;
  height: 72px;
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
    width: 30px;
    height: 30px;
  }
`;
