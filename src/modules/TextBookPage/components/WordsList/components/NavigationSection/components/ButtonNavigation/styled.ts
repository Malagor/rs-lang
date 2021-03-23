import styled from 'styled-components/macro';

type PropsStyleLink = {
  activePage: boolean;
};

export const StyleLink = styled.a<PropsStyleLink>`
  display: block;
  width: 20px;
  height: 20px;
  margin: 15px;

  color: ${({ activePage }) => (activePage ? 'red' : 'black')};
`;
