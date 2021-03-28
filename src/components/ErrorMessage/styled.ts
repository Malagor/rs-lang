import styled from 'styled-components/macro';
import { COLOR_LAYOUT_WHITE } from 'appConstants/colors';

export const ErrorWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 320px;
  padding: 24px 32px;
  background-color: ${COLOR_LAYOUT_WHITE};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

export const ErrorImage = styled.img`
  width: 100px;
  height: 100px;
  max-width: 100%;
  border-radius: 50%;
`;
