import styled from 'styled-components/macro';

export const ItemContainer = styled.div<{ lastItem?: boolean }>`
  display: flex;
  /* flex: 1 1 25%; */
  margin-right: ${({ lastItem }) => (lastItem ? '0px' : '16px')};
  margin-bottom: 16px;
  padding: 8px 24px 8px 16px;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  /* @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex: 1 1 50%;
  } */
`;

export const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

export const GameName = styled.div``;
