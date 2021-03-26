import styled from 'styled-components/macro';

export const NavContainer = styled.div`
  display: flex;

  a {
    text-decoration: none;
    color: inherit;
    max-width: 25%;
    /* flex: 0 0 25%; */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    justify-content: center;
    flex-wrap: wrap;

    a {
      max-width: 50%;
      /* flex: 0 0 50%; */
    }
  }
`;

export const Flex = styled.div`
  display: flex;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
