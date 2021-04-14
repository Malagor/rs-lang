import styled from 'styled-components/macro';
import {
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARKBLUE,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_TEXT,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';

type Props = {
  isMobile?: boolean;
};

export const Card = styled.div<Props>`
  display: flex;
  max-width: 676px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  background-color: ${COLOR_LAYOUT_WHITE};
  color: ${COLOR_LAYOUT_TEXT};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  &:not(:first-of-type) {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
  }
`;

type PhotoProps = {
  isMobile?: boolean;
  image: string;
};

export const Photo = styled.div<PhotoProps>`
  width: ${({ isMobile }) => (isMobile ? 'auto' : '220px')};
  height: ${({ isMobile }) => (isMobile ? '270px' : 'auto')};
  margin: ${({ theme, isMobile }) => (isMobile ? theme.spacing(2) : 0)}px;
  margin-bottom: 0;
  flex-shrink: 0;
  background-image: url('${({ image }) => image}');
  background-size: cover;
  background-position: center;
`;

export const Content = styled.div<Props>`
  display: flex;
  flex-direction: column;
  min-height: ${({ isMobile }) => (isMobile ? 'auto' : '240px')};
  padding-top: ${({ theme, isMobile }) => theme.spacing(isMobile ? 2 : 3)}px;
  padding-bottom: ${({ theme, isMobile }) => theme.spacing(isMobile ? 2 : 3)}px;
  padding-right: ${({ theme, isMobile }) => theme.spacing(isMobile ? 2 : 4)}px;
  padding-left: ${({ theme, isMobile }) => theme.spacing(isMobile ? 2 : 5)}px;
`;

export const Name = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${COLOR_LAYOUT_DARKBLUE};
  font-weight: 500;
  line-height: 1.2;
`;

export const Role = styled.span`
  font-size: 14px;
  color: ${COLOR_LAYOUT_DARK_GRAY};
`;

export const Paragraph = styled.p<Props>`
  flex-grow: 1;
  margin: ${({ theme, isMobile }) => theme.spacing(isMobile ? 2 : 3)}px 0 0;
  font-size: 16px;
  line-height: 1.5;
`;

export const GitHubLink = styled.a`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  align-self: flex-start;
  font-size: 16px;
  color: ${COLOR_LAYOUT_DARKBLUE};
  transition: color 150ms ease;
  &:hover {
    color: ${COLOR_LAYOUT_BLUE};
  }
`;
