import styled from 'styled-components/macro';

export const LayoutStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  height: 100px;
  background: #ddd;
`;
