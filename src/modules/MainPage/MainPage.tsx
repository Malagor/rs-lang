import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, useTheme } from '@material-ui/core';
import { URL_TEXT_BOOK } from 'appConstants/url';
import heroImageSrc from 'assets/svg/main-hero.svg';
import dontForgetImageSrc from 'assets/svg/main-dont-forget.svg';
import { COLOR_LAYOUT_BLUE, COLOR_LAYOUT_YELLOW } from 'appConstants/colors';
import {
  setLoginModalOpen,
  setPageTitle,
  setRegistrationModalOpen,
} from 'store/commonState/actions';
import {
  Button,
  ButtonLink,
  DontForgetContent,
  DontForgetImage,
  Hero,
  HeroContent,
  HeroImage,
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

  return (
    <Container>
      <Hero theme={theme}>
        <HeroContent>
          <Title theme={theme}>RS Lang</Title>
          <Subtitle theme={theme}>
            Learning English has never been so easy
          </Subtitle>
          <Paragraph theme={theme}>
            Memorizing English words can be fun and challenging. Play games,
            listen to pronunciation, improve your knowledge. With our app,
            learning is a joy.
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
        <HeroImage src={heroImageSrc} theme={theme} />
      </Hero>
      <Section theme={theme}>
        <SectionTitle theme={theme}>Advantages</SectionTitle>
        <Advantages />
      </Section>
      <Section theme={theme}>
        <SectionTitle theme={theme}>All posibilities</SectionTitle>
        <VideoContainer>
          <VideoWrapper>
            <Video src="https://www.youtube-nocookie.com/embed/v56g_IdSihQ" />
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
        <DontForgetImage src={dontForgetImageSrc} theme={theme} />
      </Section>
      <Section theme={theme}>
        <SectionTitle theme={theme}>Our team</SectionTitle>
        <OurTeam />
      </Section>
    </Container>
  );
};
