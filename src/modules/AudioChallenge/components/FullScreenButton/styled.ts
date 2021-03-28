import styled from 'styled-components/macro';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const FullScreenWrapper = styled.button`
  position: absolute;
  top: 30px;
  right: 47px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_LAYOUT_BACKGROUND};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;
