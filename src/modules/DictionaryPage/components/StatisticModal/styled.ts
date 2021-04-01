import styled from 'styled-components/macro';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div``;

export const MarkedBlock = styled.div`
  width: 100%;
  height: 8px;

  & + div {
    margin-left: 8px;
  }
`;

type MarkedItemType = {
  length: number;
  color: string;
};

export const MarkedItem = styled.div<MarkedItemType>`
  height: 8px;
  width: ${({ length }) => length}%;
  /* width: 33%; */
  background-color: ${({ color }) => color};
`;

export const Explanations = styled.div`
  display: flex;
  & + div {
    margin-left: 16px;
  }
`;

export const LearningWords = styled.div`
  display: flex;

  & + span {
    margin-left: 8px;
  }
`;

export const Marker = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
