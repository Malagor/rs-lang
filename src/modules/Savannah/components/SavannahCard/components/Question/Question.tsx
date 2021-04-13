import React, { FC, useEffect, useState } from 'react';
import { Word } from 'types';
import { QuestionWrapper, CurrentWord } from './styled';

type QuestionProps = {
  word: Word;
  hasAnswer: boolean;
  setAnimation?: (flag: boolean) => void;
  setFinishRound: (flag: boolean) => void;
};

const ANIMATION_DELAY = 1000;
const ANIMATION_DURATION = 500;

export const Question: FC<QuestionProps> = ({
  word,
  hasAnswer,
  setAnimation,
  setFinishRound,
}) => {
  const [top, setTop] = useState(0);

  // useEffect(() => {
  // }, [setFinishRound, word]);

  useEffect(() => {
    // setFinishRound(false);
    console.log('useEffect Start');
    if (hasAnswer) {
      console.log('есть ответ');
      setTimeout(() => {
        setFinishRound(true);
      }, ANIMATION_DELAY);
    }
    const interval = setInterval(() => {
      setTop((prev) => {
        if (hasAnswer) {
          console.log('prev', prev);

          //   setTimeout(() => {
          //     setFinishRound(true);
          //   }, ANIMATION_DELAY);
          return prev;
        }
        if (prev + 100 < 500) {
          return prev + 50;
        }
        if (prev >= 500) {
          setTimeout(() => {
            // setFinishRound(true);
          }, ANIMATION_DELAY);
        }
        return 500;
      });
    }, ANIMATION_DURATION);

    return () => {
      console.log('useEffect FINISH');
      setTop(0);
      clearInterval(interval);
      // setTimeout(() => {
      //   setAnimation(false);
      // }, ANIMATION_DELAY);
    };
  }, [setFinishRound, hasAnswer, word]);

  const styleDrop = {
    top: `${top}px`,
    transition: `top ${ANIMATION_DURATION}ms linear`,
    opacity: 1,
  };

  const styleIncorrect = {
    letterSpacing: `100px`,
    transition: `letter-spacing ${ANIMATION_DURATION}s linear`,
  };

  return (
    <QuestionWrapper>
      <CurrentWord topPosition={top} style={top ? styleDrop : {}}>
        {word.word}
      </CurrentWord>
    </QuestionWrapper>
  );
};
