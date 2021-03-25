import { COLOR_LAYOUT_LIGHT_GRAY } from 'appConstants/colors';
import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-direction: column-reverse;
    margin-bottom: 8px;
  }
`;

export const WordBlock = styled.div<{ colorGroup: string }>`
  border-left: 3px solid ${({ colorGroup }) => colorGroup};
  padding-left: 23px;

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin-top: 16px;
  }
`;

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
  color: ${COLOR_LAYOUT_LIGHT_GRAY};
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

export const WrapperIconWithStatistic = styled.div`
  display: flex;
`;
