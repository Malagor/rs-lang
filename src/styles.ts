import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-direction: column;
  }
`;
