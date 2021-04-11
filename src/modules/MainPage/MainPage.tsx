import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, useTheme } from '@material-ui/core';
import lottie from 'lottie-web';
import { URL_TEXT_BOOK } from 'appConstants/url';
import { COLOR_LAYOUT_BLUE, COLOR_LAYOUT_YELLOW } from 'appConstants/colors';
import {
  setLoginModalOpen,
  setPageTitle,
  setRegistrationModalOpen,
} from 'store/commonState/actions';
import heroAnimationData from 'assets/animations/main-hero.json';
import dontForgetAnimationData from 'assets/animations/main-dont-forget.json';
import {
  Button,
  ButtonLink,
  DontForgetAnimation,
  DontForgetAnimationContainer,
  DontForgetContent,
  Hero,
  HeroAnimation,
  HeroAnimationContainer,
  HeroContent,
  Paragraph,
  Section,
  SectionTitle,
  Subtitle,
  Title,
  Video,
  VideoContainer,
  VideoWrapper,
} from './styled';
import { Advantages } from './components/Advantages';
import { OurTeam } from './components/OurTeam';

type MainPageProps = {};

export const MainPage: FC<MainPageProps> = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const heroAnimationRef = useRef<HTMLDivElement>(null);
  const dontForgetAnimationRef = useRef<HTMLDivElement>(null);

  const handleLoginButtonClick = () => {
    dispatch(setLoginModalOpen(true));
    dispatch(setRegistrationModalOpen(false));
  };
  const handleRegistrationButtonClick = () => {
    dispatch(setRegistrationModalOpen(true));
    dispatch(setLoginModalOpen(false));
  };

  useEffect(() => {
    dispatch(setPageTitle('Main'));
  }, [dispatch]);

  useEffect(() => {
    if (heroAnimationRef.current) {
      lottie.loadAnimation({
        container: heroAnimationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: heroAnimationData,
      });
    }
    if (dontForgetAnimationRef.current) {
      lottie.loadAnimation({
        container: dontForgetAnimationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: dontForgetAnimationData,
      });
    }
  }, []);

  return (
    <Container>
      <Hero theme={theme}>
        <HeroContent>
          <Title theme={theme}>RS Lang</Title>
          <Subtitle theme={theme}>
            Learning English has never been so easy
          </Subtitle>
          <Paragraph theme={theme}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            commodo adipiscing malesuada sed ullamcorper mi sit enim mauris.
            Ipsum, mauris laoreet laoreet potenti maecenas convallis.
          </Paragraph>
          <ButtonLink
            to={URL_TEXT_BOOK}
            exact={true}
            theme={theme}
            color={COLOR_LAYOUT_YELLOW}
          >
            let's start
          </ButtonLink>
        </HeroContent>
        <HeroAnimationContainer theme={theme}>
          <HeroAnimation ref={heroAnimationRef} theme={theme} />
        </HeroAnimationContainer>
      </Hero>
      <Section theme={theme}>
        <SectionTitle theme={theme}>Advantages</SectionTitle>
        <Advantages />
      </Section>
      <Section theme={theme}>
        <SectionTitle theme={theme}>All posibilities</SectionTitle>
        <VideoContainer>
          <VideoWrapper>
            <Video src="https://www.youtube-nocookie.com/embed/tgbNymZ7vqY" />
          </VideoWrapper>
        </VideoContainer>
      </Section>
      <Section theme={theme}>
        <Title theme={theme}>Don't forget</Title>
        <DontForgetContent>
          <Paragraph theme={theme}>
            If you want to see statistics for all time and have access to the
            dictionary, please login or sign up first.
          </Paragraph>
          <Button
            theme={theme}
            color={COLOR_LAYOUT_BLUE}
            onClick={handleLoginButtonClick}
          >
            login
          </Button>
          <Button
            theme={theme}
            color={COLOR_LAYOUT_YELLOW}
            onClick={handleRegistrationButtonClick}
          >
            sign up
          </Button>
        </DontForgetContent>
        <DontForgetAnimationContainer theme={theme}>
          <DontForgetAnimation ref={dontForgetAnimationRef} />
        </DontForgetAnimationContainer>
      </Section>
      <Section theme={theme}>
        <SectionTitle theme={theme}>Our team</SectionTitle>
        <OurTeam />
      </Section>
    </Container>
  );
};
