import { SERVER_URL } from 'appConstants';
import React, { FC, useRef, useEffect } from 'react';
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
  isOpened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  doAfterClose?(): void;
};

export const GameResults: FC<GameResultsProps> = ({
  rightAnswers,
  wrongAnswers,
  rightlyAnswered,
  wronglyAnswered,
  isOpened,
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

  return isOpened ? (
    <Container ref={modalRef}>
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
      <CloseButton ref={closeButtonRef} />
      <audio ref={audioRef}>
        <track kind="captions" />
      </audio>
    </Container>
  ) : null;
};
