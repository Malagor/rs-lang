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
  setFinishRound,
}) => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((prev) => {
        if (hasAnswer) {
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
      setTop(0);
      clearInterval(interval);
    };
  }, [setFinishRound, hasAnswer, word]);

  const styleDrop = {
    top: `${top}px`,
    transition: `top ${ANIMATION_DURATION}ms linear`,
    opacity: 1,
  };

  return (
    <QuestionWrapper>
      <CurrentWord topPosition={top} style={top ? styleDrop : {}}>
        {word.word}
      </CurrentWord>
    </QuestionWrapper>
  );
};
