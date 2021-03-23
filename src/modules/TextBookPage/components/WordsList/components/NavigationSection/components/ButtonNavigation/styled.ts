import styled from 'styled-components/macro';

type PropsStyleLink = {
  activePage: boolean;
};

export const StyleLink = styled.a<PropsStyleLink>`
  color: ${({ activePage }) => (activePage ? 'red' : 'black')};
`;
