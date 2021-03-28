import { SERVER_URL } from 'appConstants';
import React, { FC, useRef, useEffect } from 'react';
import { Word } from 'types';
import {
  AccuracyChart,
  AccuracyContainer,
  AccuracyWord,
  CategoryContainer,
  CloseButton,
  Container,
  Content,
  CorrectNumber,
  CategoryHeader,
  CategoryHeaderContainer,
  Header,
  MistakesNumber,
  ModalName,
  PlayAgainButton,
  SoundIcon,
  WordItem,
  WordItself,
  WordList,
  StripesContainer,
  StripesBlock,
  Stripe,
  Legend,
  AnswerStats,
  LegendItem,
  LegendItemMarker,
  LegendItemText,
  LearnedWordsTotal,
  LearnedWordsTotalNumber,
} from './styled';

type GameResultsProps = {
  rightAnswers: number;
  wrongAnswers: number;
  inARow: number;
  rightlyAnswered: Word[];
  wronglyAnswered: Word[];
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  doAfterClose?(): void;
};

export const GameResults: FC<GameResultsProps> = ({
  rightAnswers,
  wrongAnswers,
  inARow,
  rightlyAnswered,
  wronglyAnswered,
  setOpened,
  doAfterClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleClose = (evt: MouseEvent) => {
      if (modalRef.current && closeButtonRef.current) {
        if (
          !modalRef.current.contains(evt.target as Node) ||
          closeButtonRef.current.contains(evt.target as Node)
        ) {
          setOpened(false);
          if (doAfterClose) {
            doAfterClose();
          }
        }
      }
    };
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [setOpened, doAfterClose]);

  function getWordItems(wordArray: Word[]) {
    return wordArray.map((word) => (
      <WordItem key={word.id}>
        <SoundIcon onClick={() => handleSoundClick(word.audio)} />
        <WordItself>{word.word}</WordItself>
        <span>&nbsp;– {word.wordTranslate}</span>
      </WordItem>
    ));
  }

  function handleSoundClick(audioLink: string) {
    const fullAudioUrl = `${SERVER_URL}${audioLink}`;
    if (audioRef && audioRef.current) {
      audioRef.current.src = fullAudioUrl;
      audioRef.current.play().catch((err) => err);
    }
  }

  const wrongItems = getWordItems(wronglyAnswered);
  const correctItems = getWordItems(rightlyAnswered);
  const totalAnswers = rightAnswers + wrongAnswers;
  const inARowShare = inARow / totalAnswers;
  const rightShare = rightAnswers / totalAnswers;
  const wrongShare = wrongAnswers / totalAnswers;

  return (
    <Container ref={modalRef}>
      <Header>
        <ModalName>Results</ModalName>
        <PlayAgainButton>play again</PlayAgainButton>
      </Header>
      <Content>
        <AnswerStats>
          <AccuracyContainer>
            <AccuracyChart />
            <AccuracyWord>Accuracy</AccuracyWord>
          </AccuracyContainer>
          <StripesContainer>
            <StripesBlock>
              <Stripe type="inARow" share={inARowShare} />
              <Stripe type="right" share={rightShare} />
              <Stripe type="wrong" share={wrongShare} />
            </StripesBlock>
            <Legend>
              <LegendItem>
                <LegendItemMarker type="inARow" />
                <LegendItemText>In a row&nbsp;</LegendItemText>
                <LegendItemText>{inARow}</LegendItemText>
              </LegendItem>
              <LegendItem>
                <LegendItemMarker type="right" />
                <LegendItemText>Right answers&nbsp;</LegendItemText>
                <LegendItemText>{rightAnswers}</LegendItemText>
              </LegendItem>
              <LegendItem>
                <LegendItemMarker type="wrong" />
                <LegendItemText>Mistakes&nbsp;</LegendItemText>
                <LegendItemText>{wrongAnswers}</LegendItemText>
              </LegendItem>
            </Legend>
          </StripesContainer>
        </AnswerStats>
        <LearnedWordsTotal>
          <LearnedWordsTotalNumber>{rightAnswers}</LearnedWordsTotalNumber>
          words were repeated
        </LearnedWordsTotal>
        <CategoryContainer>
          <CategoryHeaderContainer>
            <CategoryHeader>Mistakes</CategoryHeader>
            <MistakesNumber>{wrongAnswers}</MistakesNumber>
          </CategoryHeaderContainer>
          <WordList>{wrongItems}</WordList>
        </CategoryContainer>
        <CategoryContainer>
          <CategoryHeaderContainer>
            <CategoryHeader>Correct Answers</CategoryHeader>
            <CorrectNumber>{rightAnswers}</CorrectNumber>
          </CategoryHeaderContainer>
          <WordList>{correctItems}</WordList>
        </CategoryContainer>
      </Content>
      <CloseButton ref={closeButtonRef} />
      <audio ref={audioRef}>
        <track kind="captions" />
      </audio>
    </Container>
  );
};
