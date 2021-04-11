import styled from 'styled-components/macro';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;
export const Title = styled.div`
  font-size: 1.5rem;
`;

export const MarkedBlock = styled.div`
  display: flex;
  width: 100%;
  height: 8px;

  & + div {
    margin-right: 8px;
  }
`;

type MarkedItemType = {
  length: number;
  color: string;
};

export const MarkedItem = styled.div<MarkedItemType>`
  height: 8px;
  width: ${({ length }) => length}%;
  background-color: ${({ color }) => color};
  margin: 4px;
  border-radius: 4px;
`;

export const Explanations = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ExplanationItem = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;

  span {
    margin: 0 4px;
  }
`;

export const Marker = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;