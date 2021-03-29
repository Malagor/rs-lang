import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1 1 auto;
  width: 235px;
  display: flex;
  justify-content: space-between;

  button {
    align-self: flex-end;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin-top: 24px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin: 0 auto;
  }
`;
