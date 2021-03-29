import styled from 'styled-components/macro';
import {
  COLOR_LAYOUT_BACKGROUND_RGB,
  COLOR_LAYOUT_BACKGROUND,
} from 'appConstants/colors';

export const AnswersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const AnswerItem = styled.div`
  color: ${COLOR_LAYOUT_BACKGROUND};
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.3);
  }
`;
