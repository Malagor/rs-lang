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
          Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim
          mauris.Elementum commodo adipiscing malesuada sed ullamcorper mi sit
          enim sit enim mauris.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <BookIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Dictionary</Title>
        <Paragraph theme={theme}>
          Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim
          mauris.Elementum commodo adipiscing malesuada sed ullamcorper mi sit
          enim.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <SportsEsportsIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Games</Title>
        <Paragraph theme={theme}>
          Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim
          mauris.Elementum commodo adipiscing malesuada sed ullamcorper mi sit
          enim sit enim mauris.
        </Paragraph>
      </Card>
      <Card theme={theme}>
        <EqualizerIcon style={{ color: COLOR_LAYOUT_BLUE, fontSize: 56 }} />
        <Title theme={theme}>Statistics</Title>
        <Paragraph theme={theme}>
          Elementum commodo adipiscing malesuada sed ullamcorper mi sit enim
          mauris.Elementum commodo adipiscing malesuada sed ullamcorper mi sit
          enim mauris.Elementum commodo.
        </Paragraph>
      </Card>
    </Container>
  );
};
