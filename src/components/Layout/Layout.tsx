import React, { FC } from 'react';
import { FooterWrapper, LayoutStyled, MainWrapper } from './styled';

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <LayoutStyled>
    <h1>Layout</h1>
    <MainWrapper>{children}</MainWrapper>
    <FooterWrapper>footer</FooterWrapper>
  </LayoutStyled>
);
