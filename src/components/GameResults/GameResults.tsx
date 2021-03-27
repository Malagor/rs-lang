import {
  COLOR_FONT_BLACK,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Word } from 'types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

type GameResultsProps = {
  rightAnswers: number;
  wrongAnswers: number;
  rightlyAnswered: Word[];
  wronglyAnswered: Word[];
};

export const GameResults: FC<GameResultsProps> = ({
  rightAnswers,
  wrongAnswers,
  rightlyAnswered,
  wronglyAnswered,
}) => {
  function getWordItems(wordArray: Word[]) {
    return wordArray.map((word) => (
      <WordItem key={word.id}>
        <SoundIcon />
        <WordItself>{word.word}</WordItself>
        <span>&nbsp;– {word.wordTranslate}</span>
      </WordItem>
    ));
  }

  const wrongItems = getWordItems(wronglyAnswered);
  const correctItems = getWordItems(rightlyAnswered);

  return (
    <Container>
      <CategoryContainer>
        <HeaderContainer>
          <Header>Mistakes</Header>
          <MistakesNumber>{wrongAnswers}</MistakesNumber>
        </HeaderContainer>
        <WordList>{wrongItems}</WordList>
      </CategoryContainer>

      <CategoryContainer>
        <HeaderContainer>
          <Header>Correct Answers</Header>
          <CorrectNumber>{rightAnswers}</CorrectNumber>
        </HeaderContainer>
        <WordList>{correctItems}</WordList>
      </CategoryContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 368px;
  height: 272px;
  background: ${COLOR_LAYOUT_WHITE};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border-top: 24px solid ${COLOR_LAYOUT_WHITE};
  border-right: 32px solid ${COLOR_LAYOUT_WHITE};
  border-bottom: 24px solid ${COLOR_LAYOUT_WHITE};
  border-left: 35px solid ${COLOR_LAYOUT_WHITE};
  color: ${COLOR_LAYOUT_DARK_GRAY};
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: ${COLOR_LAYOUT_GRAY} ${COLOR_LAYOUT_WHITE};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR_LAYOUT_GRAY};
    border-radius: 10px;
  }
`;

const CategoryContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const Header = styled.h4`
  margin: 0;
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

const MistakesNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  background: ${COLOR_LAYOUT_DARK_GRAY};
  border-radius: 5px;
  color: ${COLOR_LAYOUT_BACKGROUND};
`;

const CorrectNumber = styled(MistakesNumber)`
  background: ${COLOR_LAYOUT_BLUE};
`;

const WordList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const WordItem = styled.li`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const SoundIcon = styled(VolumeUpIcon)`
  margin-right: 8px;
`;

const WordItself = styled.span`
  color: ${COLOR_FONT_BLACK};
  text-transform: capitalize;
`;
