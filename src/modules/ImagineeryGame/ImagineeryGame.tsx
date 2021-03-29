import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { selectWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Countdown, Loader } from 'components';

const shuffle = (words: Word[]) => {
  const arr = words;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const INITIAL_COUNTDOWN_TIME = 3;
const COUNTDOWN_TIME = 10;
const QUIZ_COUNT = 10;

export const ImagineeryGame = () => {
  const [hasStarted, setStarted] = useState(false);
  const [hasFinished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [rightlyAnswered, setRightlyAnswered] = useState<Word[]>([]);
  const [wronglyAnswered, setWronglyAnswered] = useState<Word[]>([]);
  const [quizWord, setQuizWord] = useState<Word | null>(null);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const words: Word[] = useSelector(selectWords);
  const wordUrls = useMemo(
    () => words.map((word) => `${SERVER_URL}${word.image}`),
    [words]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWords(1, 3));
  }, [dispatch]);

  useEffect(() => {
    if (!words) return;
    const preloadedImages = wordUrls.map((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      return img;
    });
    setImages(preloadedImages);
    if (images.length > 0) {
      setLoading(false);
    }
  }, [words, wordUrls, images.length]);

  useEffect(() => {
    const randomWords = shuffle(words).slice(0, 8);
    const randomWord = randomWords[Math.floor(Math.random() * 8)];
    setCurrentWords(randomWords);
    setQuizWord(randomWord);
  }, [setCurrentWords, setQuizWord, words, round]);

  useEffect(() => {
    if (round === QUIZ_COUNT) {
      setFinished(true);
      console.log('game is finished');
    }
  }, [setFinished, round]);

  const handleImageClick = (word: Word) => {
    if (!quizWord) return;
    if (word.id === quizWord.id) {
      setRightAnswers(rightAnswers + 1);
      setRightlyAnswered([...rightlyAnswered, quizWord]);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setWronglyAnswered([...wronglyAnswered, quizWord]);
    }
    setRound(round + 1);
  };

  const handleCountdownEnd = (): [boolean, number] | void => {
    setRound(round + 1);
    setWrongAnswers(wrongAnswers + 1);
    setWronglyAnswered([...wronglyAnswered, quizWord!]);
    if (round < QUIZ_COUNT) {
      return [true, 0];
    }
    return undefined;
  };

  const wordImages = currentWords.map((word) => (
    <WordImage
      key={word.id}
      src={`${SERVER_URL}${word.image}`}
      alt={word.word}
      onClick={() => handleImageClick(word)}
    />
  ));

  return (
    <GameContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dashboard>
            <InitialCountdownContainer gameIsStarted={hasStarted}>
              <Countdown
                duration={INITIAL_COUNTDOWN_TIME}
                onComplete={() => setStarted(true)}
              />
            </InitialCountdownContainer>
            <CountdownContainer gameIsStarted={hasStarted}>
              <Countdown
                key={hasFinished ? -1 : round}
                duration={COUNTDOWN_TIME}
                onComplete={handleCountdownEnd}
                isPlaying={hasStarted && !hasFinished}
              />
            </CountdownContainer>
            Right: {rightAnswers} Wrong: {wrongAnswers}
          </Dashboard>
          <GameField>
            {wordImages}
            <QuizWordContainer>{quizWord && quizWord.word}</QuizWordContainer>
          </GameField>
        </>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 20px;
  align-content: center;
  justify-content: stretch;
  min-height: 88vh;
  background: linear-gradient(180deg, #7f53ac 0%, #647dee 100%);
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  justify-content: center;
  color: white;
`;

const InitialCountdownContainer = styled.div<{ gameIsStarted: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ gameIsStarted }) => (gameIsStarted ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #7f53ac 0%, #647dee 100%);
`;

const CountdownContainer = styled.div<{ gameIsStarted: boolean }>`
  display: ${({ gameIsStarted }) => (gameIsStarted ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const GameField = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, auto);
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const WordImage = styled.img`
  max-width: 100%;
  max-height: 20vh;
  overflow: hidden;
`;

const QuizWordContainer = styled.div`
  grid-row: 2;
  grid-column: 2;
  /* justify-self: stretch;
  align-self: stretch; */
  color: white;
  font-size: 2rem;
`;
