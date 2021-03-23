import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginModal } from 'components';
import { FooterWrapper, LayoutStyled, MainWrapper } from './styled';

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <LayoutStyled>
    <h1>RS-Lang. Team 53</h1>

    <LoginModal />
    <NavLink to="/">Main page</NavLink>
    <NavLink to="/textbook">TextBook page</NavLink>
    <MainWrapper>{children}</MainWrapper>
    <FooterWrapper>footer</FooterWrapper>
  </LayoutStyled>
);
