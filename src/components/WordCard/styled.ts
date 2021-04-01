import styled from 'styled-components/macro';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const WordCard = styled.div`
  display: flex;
`;

type CardContainerType = {
  difficultColor?: string;
};
export const CardContainer = styled.div<CardContainerType>`
  display: flex;
  max-width: 832px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 24px;
  background-color: ${({ difficultColor }) =>
    difficultColor || COLOR_LAYOUT_BACKGROUND};
  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-direction: column;
  }
`;

export const WordImage = styled.img`
  width: 240px;
  height: 281px;
  object-fit: cover;
  object-position: center;
  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    width: 100%;
    margin-bottom: 24px;
    height: 307px;
  }
`;

export const ContentBlock = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding-left: 32px;

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    padding-left: 0;
    padding-bottom: 16px;
  }
`;
