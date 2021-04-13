import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'store/commonState/actions';
import {
  selectTextBookGroup,
  selectTextBookPage,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import { FullScreenWrapperFlexCenter } from 'styles';
import { Word } from 'types';
import { database, LocStore } from 'services';
import { FullscreenButton, GameResults, SoundButton } from 'components';
import { COUNT_ANSWERS, SAVANNAH_LIVES } from 'appConstants/games';
import 'react-circular-progressbar/dist/styles.css';
import { SAVANNAH_BACKGROUND } from 'appConstants/colors';
import FinishSound from 'assets/sounds/finish.mp3';
import CorrectSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/error.mp3';
import { AudioWrapper, GameContainer } from './styled';
import { SavannahCard, ProgressBar, Lives } from './components';

const KEYS_ARRAY = Array(COUNT_ANSWERS)
  .fill(1)
  .map((_, i) => `${i + 1}`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mixingArray = (arr: any[]) => {
  const locArr = [...arr];
  locArr.sort(() => Math.random() - 0.5);
  return locArr;
};

// Component
export const Savannah: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(selectUserId);
  const group = useSelector(selectTextBookGroup);
  const page = useSelector(selectTextBookPage);

  // helpers
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);

  // about quiz
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrentWord] = useState(0);
  const [answersArray, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswer] = useState('-1');
  const [userAnswerIndex, setUserAnswer] = useState('-1');
  const [lives, setLives] = useState(SAVANNAH_LIVES);
  const [finishRound, setFinishRound] = useState(false);

  // statistics
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [chain, setChain] = useState(0);
  const [longerChain, setLongerChain] = useState(0);

  // finish
  const [isFinish, setFinish] = useState(false);

  // Set Title Page
  useEffect(() => {
    dispatch(setPageTitle('Savannah'));
  }, [dispatch]);

  // Play sound
  const playSound = useCallback(
    (soundUrl: string) => {
      if (isSoundOn && soundRef && soundRef.current) {
        soundRef.current.src = soundUrl;
        soundRef.current.play().catch((err) => err);
      }
    },
    [isSoundOn]
  );

  const saveStatistics = useCallback(() => {
    if (!userId) {
      LocStore.updateGamesStatistics(
        'Audio challenge',
        correctWords,
        incorrectWords,
        longerChain
      );
      LocStore.updateWordsStatistics(correctWords, incorrectWords);
    }
  }, [userId, correctWords, incorrectWords, longerChain]);

  // New Game
  const handlerNewGame = useCallback(() => {
    setFinish(false);
    setCorrectWords([]);
    setIncorrectWords([]);
    setCurrentWord(0);
    setChain(0);
    setLongerChain(0);
    setIsResultOpen(false);
    setLives(SAVANNAH_LIVES);
    // setAnimation(false);
  }, []);

  // Load Words
  useEffect(() => {
    let locWords: Promise<Word[]>;
    if (userId) {
      locWords = database
        .getUserAggregatedWord({
          userId,
          group,
          page,
          wordPerPage: 6,
          filter: `{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}`,
        })
        .then((data) => data[0].paginatedResults);
    } else {
      locWords = database.getWords(group, page);
    }

    locWords.then((data) => {
      const mixArr = mixingArray(data);
      setWords(mixArr);
    });
    handlerNewGame();
  }, [handlerNewGame, group, page, userId]);

  // Correct Answer
  const handlerCorrectAnswer = useCallback(() => {
    // console.log('CORRECT:', words[current].wordTranslate);
    setCorrectWords([...correctWords, words[current]]);
    setChain((prev) => prev);
    playSound(CorrectSound);
  }, [correctWords, words, current, playSound]);

  // Incorrect Answer
  const handlerIncorrectAnswer = useCallback(() => {
    // console.log('INCORRECT:', words[current].wordTranslate);
    setIncorrectWords([...incorrectWords, words[current]]);
    if (chain > longerChain) {
      setLongerChain(chain);
    }
    setChain(0);
    playSound(WrongSound);
    setLives((l: number) => l - 1);
    if (lives - 1 <= 0) {
      setFinish(true);
    }
  }, [
    setFinish,
    lives,
    incorrectWords,
    chain,
    longerChain,
    words,
    current,
    playSound,
  ]);

  // Choice of answer variants
  const addVariantsAnswers = useCallback(() => {
    if (words && words[current]) {
      let candidatesForAnswers: Word[] = mixingArray(words).splice(
        0,
        COUNT_ANSWERS
      );

      const indexCurrentWord = candidatesForAnswers.findIndex(
        (word: Word) => word.wordTranslate === words[current].wordTranslate
      );

      if (indexCurrentWord === -1) {
        candidatesForAnswers.splice(-1, 1, words[current]);
      } else {
        candidatesForAnswers.splice(indexCurrentWord, 1, words[current]);
      }

      candidatesForAnswers = mixingArray(candidatesForAnswers);

      const answer = candidatesForAnswers.map((word) => word.wordTranslate);
      const indexRightAnswer = answer.indexOf(words[current].wordTranslate);

      setAnswers(answer);
      setCorrectAnswer(indexRightAnswer.toString());
    }
  }, [words, current]);

  // Next Round
  const nextRound = useCallback(() => {
    // useEffect(() => {
    setUserAnswer('-1');
    if (current === words.length - 1) setFinish(true);
    if (current < words.length) {
      setCurrentWord((prev) => prev + 1);
    }
  }, [words, current]);

  // Check Answer
  const checkAnswer = useCallback(
    (index: string) => {
      if (index === correctAnswerIndex) {
        handlerCorrectAnswer();
      } else {
        handlerIncorrectAnswer();
      }
      setUserAnswer(index);
      console.log('Новый раунд');
      if (finishRound) {
        nextRound();
      }
    },
    [
      finishRound,
      nextRound,
      correctAnswerIndex,
      handlerCorrectAnswer,
      handlerIncorrectAnswer,
    ]
  );

  // Finish Game
  const handleFinishGame = useCallback(() => {
    if (isFinish) {
      setLongerChain(chain > longerChain ? chain : longerChain);
      setIsResultOpen(true);
      playSound(FinishSound);
      saveStatistics();
    }
  }, [chain, longerChain, playSound, isFinish, saveStatistics]);

  const closeResultModal = useCallback(() => {
    // history.push('/games');
    // TODO: Убрать начало новой игры и вернуть переадресацию
    handlerNewGame();
  }, [handlerNewGame, history]);

  // Keyboard listener
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key, repeat } = e;

      // select answer
      if (!repeat && KEYS_ARRAY.includes(key)) {
        if (isFinish) {
          return;
        }
        // if (userAnswerIndex !== '-1') {
        //   console.log('keyDownHandler ответ пользователя === -1');
        //   return;
        // }
        const index = `${parseInt(key, 10) - 1}`;
        checkAnswer(index);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [checkAnswer, isFinish]);

  // Add Variants for Answers listener
  useEffect(() => {
    addVariantsAnswers();
  }, [addVariantsAnswers]);

  // Finish game listener
  useEffect(() => {
    if (lives <= 0 || isFinish) {
      handleFinishGame();
    }
  }, [handleFinishGame, lives, isFinish]);

  const hasContent = words.length && words[current];

  // console.log('hasAnimation', hasAnimation);
  return (
    <GameContainer background={SAVANNAH_BACKGROUND} ref={containerRef}>
      <FullScreenWrapperFlexCenter>
        <AudioWrapper>
          {!isFinish && (
            <ProgressBar
              group={group}
              totalCount={words.length}
              current={current}
            />
          )}
          <Lives lives={lives} />
          <SoundButton isSoundOn={isSoundOn} setSoundOn={setSoundOn} />
          <audio ref={soundRef}>
            <track kind="captions" />
          </audio>

          <FullscreenButton
            isFullscreen={isFullScreen}
            setFullscreen={setIsFullScreen}
            containerRef={containerRef}
          />
          {hasContent && !isFinish ? (
            <SavannahCard
              word={words[current]}
              variants={answersArray}
              correctIndex={correctAnswerIndex}
              userChoice={userAnswerIndex}
              onUserAnswer={checkAnswer}
              // onAnimation={setAnimation}
              onFinishRound={setFinishRound}
            />
          ) : null}
          {isResultOpen && isFinish && (
            <GameResults
              inARow={longerChain}
              rightlyAnswered={correctWords}
              wronglyAnswered={incorrectWords}
              isOpened={isResultOpen}
              setOpened={setIsResultOpen}
              handlePlayAgain={handlerNewGame}
              doAfterClose={closeResultModal}
            />
          )}
        </AudioWrapper>
      </FullScreenWrapperFlexCenter>
    </GameContainer>
  );
};
