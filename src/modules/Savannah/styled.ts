import styled from 'styled-components/macro';

export const AudioWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GameContainer = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ background }) => background || 'black'};
`;
