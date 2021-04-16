import styled from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND,
  SPRINT_BACKGROUND,
} from 'appConstants/colors';

export const GameContainer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 20px;
  align-content: center;
  justify-content: stretch;
  height: 100%;
  padding: 20px;
  background: ${SPRINT_BACKGROUND};
`;
