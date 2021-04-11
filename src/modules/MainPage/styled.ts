import styled from 'styled-components/macro';
import { lighten, Theme } from '@material-ui/core';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_DARKBLUE,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_TEXT,
} from 'appConstants/colors';
import { NavLink } from 'react-router-dom';

const buttonMixin = (theme: Theme, color: string) => `
display: inline-block;
margin-top: ${theme.spacing(3)}px;
padding: ${theme.spacing()}px
  ${theme.spacing(5)}px;
color: ${COLOR_LAYOUT_BACKGROUND};
background-color: ${color};
text-align: center;
text-decoration: none;
font-size: 16px;
line-height: 1.5;
outline: none;
border: none;
cursor: pointer;
transition: background-color 0.2s ease;
&:hover {
  background-color: ${lighten(color, 0.2)};
}
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing(4)}px 0;
  color: ${COLOR_LAYOUT_TEXT};
  font-size: 16px;
  line-height: 1.5;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding: ${({ theme }) => theme.spacing(3)}px 0;
  }
`;

export const Title = styled.div`
  font-size: 60px;
  color: ${COLOR_LAYOUT_DARKBLUE};
  font-weight: 700;
  line-height: 1;
  margin: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 40px;
  }
`;

export const Subtitle = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing()}px;
  color: ${COLOR_LAYOUT_DARK_GRAY};
`;

export const Paragraph = styled.p`
  display: block;
  margin: ${({ theme }) => theme.spacing(2)}px 0 0;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing(6)}px;
  font-size: 35px;
  font-weight: 500;
  line-height: 1;
  color: ${COLOR_LAYOUT_DARKBLUE};
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin: 0 0 ${({ theme }) => theme.spacing(4)}px;
  }
`;

type ButtonProps = {
  color: string;
};

export const ButtonLink = styled(NavLink)<ButtonProps>`
  ${({ theme, color }) => buttonMixin(theme, color)}
`;

export const Button = styled.button<ButtonProps>`
  ${({ theme, color }) => buttonMixin(theme, color)}
  min-width: 115px;
  padding: ${({ theme }) => theme.spacing()}px
    ${({ theme }) => theme.spacing(4)}px;
  &:not(:first-of-type) {
    margin-left: ${({ theme }) => theme.spacing(3)}px;
  }
`;

export const Hero = styled(Section)`
  padding-top: 0;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  gap: ${({ theme }) => theme.spacing(6)}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    gap: ${({ theme }) => theme.spacing(2)}px;
    flex-direction: column-reverse;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  max-width: 424px;
`;

export const HeroAnimationContainer = styled.div`
  position: relative;
  max-width: 350px;
  width: 100%;
  height: 420px;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    max-width: 250px;
    height: 300px;
  }
`;

export const HeroAnimation = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 320px;
    height: 320px;
  }
`;

export const VideoContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
`;

export const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

export const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const DontForgetContent = styled.div`
  max-width: 385px;
  text-align: center;
`;

export const DontForgetAnimationContainer = styled.div`
  position: relative;
  max-width: 450px;
  width: 100%;
  height: 315px;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
  }
`;

export const DontForgetAnimation = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  left: 50%;
  bottom: auto;
  top: -65px;
  transform: translate(-50%);
`;
