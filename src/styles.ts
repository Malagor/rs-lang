import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 832px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ContentWrapperFlex = styled(ContentWrapper)`
  display: flex;
`;

export const ContentWrapperCenter = styled(ContentWrapperFlex)`
  align-items: center;
  justify-content: center;
`;

export const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const FullScreenWrapperFlex = styled(FullScreenWrapper)`
  display: flex;
`;

export const FullScreenWrapperFlexCenter = styled(FullScreenWrapper)`
  align-items: center;
  justify-content: center;
`;
