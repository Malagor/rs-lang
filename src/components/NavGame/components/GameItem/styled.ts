import styled from 'styled-components/macro';

export const ItemContainer = styled.div<{ lastItem?: boolean }>`
  display: flex;
  margin-right: ${({ lastItem }) => (lastItem ? '0px' : '16px')};
  margin-bottom: 16px;
  padding: 8px 24px 8px 16px;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

export const GameName = styled.div``;
