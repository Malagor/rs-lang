import styled from 'styled-components/macro';
import { COLOR_LAYOUT_DARKBLUE, COLOR_LAYOUT_WHITE } from 'appConstants/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(5)}px;
  max-width: 800px;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    gap: ${({ theme }) => theme.spacing(3)}px;
  }
`;

export const Card = styled.div`
  max-width: 364px;
  padding: ${({ theme }) => theme.spacing(5)}px
    ${({ theme }) => theme.spacing(4)}px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: ${COLOR_LAYOUT_WHITE};
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    max-width: 340px;
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export const Title = styled.h3`
  margin: ${({ theme }) => theme.spacing(2)}px 0 0;
  color: ${COLOR_LAYOUT_DARKBLUE};
  font-size: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin: 0;
  }
`;

export const Paragraph = styled.p`
  display: block;
  margin: ${({ theme }) => theme.spacing()}px 0 0;
`;
