import { COLOR_LAYOUT_LIGHT_GRAY } from 'appConstants/colors';
import styled from 'styled-components/macro';

export const Container = styled.div`
  flex-grow: 1;
  display: grid;
  align-items: end;
  grid-gap: 10px;
  margin: 5px 0;
`;

export const Sentence = styled.div``;

export const SentenceTranslate = styled.div`
  color: ${COLOR_LAYOUT_LIGHT_GRAY};
`;
