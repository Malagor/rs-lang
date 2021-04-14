import styled from 'styled-components/macro';

export const AudioWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
`;

export const GameContainer = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ background }) => background || 'black'};
`;

export const PlantContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
`;

export const PlantAnimation = styled.div`
  height: 100%;
  width: 100%;
`;
