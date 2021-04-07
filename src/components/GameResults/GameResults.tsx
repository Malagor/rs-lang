import React, { FC, useRef, useEffect } from 'react';
import { SERVER_URL } from 'appConstants';
import { Word } from 'types';
import { CircularProgressBar } from 'components';
import {
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
  inARow: number;
  rightlyAnswered: Word[];
  wronglyAnswered: Word[];
  isOpened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayAgain(): void;
  doAfterClose?(): void;
};

export const GameResults: FC<GameResultsProps> = ({
  inARow,
  rightlyAnswered,
  wronglyAnswered,
  isOpened,
  setOpened,
  doAfterClose,
  handlePlayAgain,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<SVGSVGElement>(null);

  const handlePlayAgainClick = () => {
    setOpened(false);
    handlePlayAgain();
  };

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
    if (isOpened) {
      setTimeout(() => {
        document.addEventListener('click', handleClose);
      }, 0);
    } else {
      document.removeEventListener('click', handleClose);
    }
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [isOpened, setOpened, doAfterClose]);

  function getWordItems(wordArray: Word[]) {
    const usedWordStrings: string[] = [];
    return wordArray.map((word) => {
      if (usedWordStrings.includes(word.word)) return null;
      usedWordStrings.push(word.word);
      return (
        <WordItem key={word.word}>
          <SoundIcon onClick={() => handleSoundClick(word.audio)} />
          <WordItself>{word.word}</WordItself>
          <span>&nbsp;– {word.wordTranslate}</span>
        </WordItem>
      );
    });
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
  const rightAnswers = rightlyAnswered.length;
  const wrongAnswers = wronglyAnswered.length;
  const totalAnswers = rightAnswers + wrongAnswers;
  const inARowShare = inARow / totalAnswers;
  const rightShare = rightAnswers / totalAnswers;
  const wrongShare = wrongAnswers / totalAnswers;
  const accuracy = Math.round(rightShare * 100);

  return isOpened ? (
    <Container ref={modalRef}>
      <Header>
        <ModalName>Results</ModalName>
        <PlayAgainButton onClick={handlePlayAgainClick}>
          play again
        </PlayAgainButton>
      </Header>
      <Content>
        <AnswerStats>
          <AccuracyContainer>
            <CircularProgressBar
              percentage={accuracy}
              className="accuracy-bar"
            />
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
          <LearnedWordsTotalNumber>{totalAnswers}</LearnedWordsTotalNumber>
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
  ) : null;
};
