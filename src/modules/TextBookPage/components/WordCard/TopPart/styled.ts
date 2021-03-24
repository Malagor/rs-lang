import styled from 'styled-components/macro';

export const Container = styled.div<{ colorGroup: string }>`
  display: flex;
  justify-content: space-between;
  border-left: 3px solid ${({ colorGroup }) => colorGroup};
  padding-left: 23px;
`;

export const WordBlock = styled.div``;

export const EnglishWord = styled.span`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 28px;
  margin-right: 9px;
`;

export const WordTranscription = styled.span`
  font-size: 1.2rem;
`;

export const WordTranslate = styled.div`
  color: #888888;
`;

export const WordStatistic = styled.div`
  width: 115px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
`;

export const InfoBlock = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: white;
`;
