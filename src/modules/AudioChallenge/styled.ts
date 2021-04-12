import styled from 'styled-components/macro';
import { AUDIO_CHALLENGE_BACKGROUND } from 'appConstants/colors';

export const AudioWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AudioGameContainer = styled.div`
  height: 100%;
  background-image: ${AUDIO_CHALLENGE_BACKGROUND};
`;
