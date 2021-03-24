import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1 1 auto;
  width: 235px;
  display: flex;
  justify-content: space-between;

  button {
    align-self: flex-end;
  }

  @media (max-width: 860px) {
    margin-top: 24px;
  }

  @media (max-width: 500px) {
    margin: 0 auto;
  }
`;
