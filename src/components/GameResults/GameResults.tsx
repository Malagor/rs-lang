import React, { FC } from 'react';
import { Word } from 'types';
import {
  CategoryContainer,
  CloseButton,
  Container,
  Content,
  CorrectNumber,
  Header,
  HeaderContainer,
  MistakesNumber,
  SoundIcon,
  WordItem,
  WordItself,
  WordList,
} from './styled';

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
      <Content>
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
      </Content>
      <CloseButton />
    </Container>
  );
};
