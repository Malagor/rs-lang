import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { selectWords } from 'modules/TextBookPage/selectors';
import { loadWords } from 'modules/TextBookPage/actions';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import { Loader } from 'components';

const shuffle = (words: Word[]) => {
  const arr = words;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const ImagineeryGame = () => {
  const [loading, setLoading] = useState(true);
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
  }, [setCurrentWords, setQuizWord, words, rightAnswers, wrongAnswers]);

  useEffect(() => {
    if (rightAnswers + wrongAnswers === 10) {
      console.log('game is finished');
    }
  });

  const handleImageClick = (word: Word) => {
    if (!quizWord) return;
    if (word.id === quizWord.id) {
      setRightAnswers(rightAnswers + 1);
      setRightlyAnswered([...rightlyAnswered, quizWord]);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setWronglyAnswered([...wronglyAnswered, quizWord]);
    }
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
  justify-content: center;
  color: white;
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
