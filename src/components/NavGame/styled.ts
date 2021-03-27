import styled from 'styled-components/macro';

export const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -8px;

  a {
    text-decoration: none;
    color: inherit;
    padding: 0px 8px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    justify-content: center;
  }
`;
