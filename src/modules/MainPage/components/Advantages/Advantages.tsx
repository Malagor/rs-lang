import React, { FC } from 'react';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BookIcon from '@material-ui/icons/Book';
import { useTheme } from '@material-ui/core';
import { COLOR_LAYOUT_BLUE } from 'appConstants/colors';
import { Container, Card, Title, Paragraph } from './styled';

export const Advantages: FC = () => {
  const theme = useTheme();

  return (
    <Container theme={theme}>
      <Card theme={theme}>
        <LocalLibraryIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Textbook</Title>
        <Paragraph theme={theme}>
          The electronic textbook consists of six sections. Each section has 30
          pages of 20 words. The translation of the word, the thematic image, as
          well as the pronunciation of both the word separately and as part of
          the phrase are presented.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <BookIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Dictionary</Title>
        <Paragraph theme={theme}>
          The dictionary contains lists of studied words, words that do not need
          to be learned, as well as those that cause difficulties. The
          dictionary reflects statistics for each section and student progress.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <SportsEsportsIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Games</Title>
        <Paragraph theme={theme}>
          For learning words and reinforcing memorization, the application has 4
          games: Savannah, Sprint, Audio Chalenge and Imaginarium, which will
          help you to "pump" your vocabulary in a playful way.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <EqualizerIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Statistics</Title>
        <Paragraph theme={theme}>
          All the progress of training can be viewed in statistics, where data
          for the current day, as well as for the entire training period, are
          presented. The information is presented both in the form of a table
          and graphs, which is very convenient.
        </Paragraph>
      </Card>
    </Container>
  );
};
