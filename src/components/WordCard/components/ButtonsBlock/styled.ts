import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1 1 auto;
  width: 246px;
  display: flex;
  justify-content: space-between;

  button {
    align-self: flex-end;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    width: 258px;
    margin: 24px auto 0;

    button {
      margin: 0 auto;
    }
  }
`;
