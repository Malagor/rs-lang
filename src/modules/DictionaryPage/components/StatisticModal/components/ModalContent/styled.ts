import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import styled from 'styled-components/macro';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: -16px 16px 8px;
`;
export const Title = styled.div`
  font-size: 1.5rem;
  margin-right: 12px;
`;

export const InfoBlock = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: white;
  padding: 2px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const WrapperMarkedBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MarkedBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  & + div {
    margin-top: 8px;
  }
`;

type MarkedItemType = {
  length: number;
  color: string;
};

export const MarkedItem = styled.div<MarkedItemType>`
  flex-grow: 1;
  height: 8px;
  width: ${({ length }) => length}%;
  background-color: ${({ color }) => color};
  margin: 8px;
  border-radius: 4px;
`;

export const Explanations = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ExplanationItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;

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

export const PagesWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  height: 160px;

  ::-webkit-scrollbar {
    width: 4px;
    height: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR_LAYOUT_GRAY};
  }
`;

export const PageStatistic = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const PageNumber = styled.span`
  margin-right: 8px;
`;

export const PageMarkedItem = styled.span<MarkedItemType>`
  height: 24px;
  flex-basis: ${({ length }) => length || 6}%;
  background-color: ${({ color }) => color};
  margin: 4px 4px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_LAYOUT_WHITE};
`;
