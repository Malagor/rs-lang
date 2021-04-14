import React, { FC, useEffect, useRef, useState } from 'react';
import { Word } from 'types';
import { QuestionWrapper, CurrentWord } from './styled';

type QuestionProps = {
  word: Word;
  hasAnswer: boolean;
  setAnimation?: (flag: boolean) => void;
  // setFinishRound: (flag: boolean) => void;
};

const ANIMATION_DELAY = 1000;
const ANIMATION_DURATION = 100;

export const Question: FC<QuestionProps> = ({
  word,
  hasAnswer,
  // setFinishRound,
}) => {
  const [top, setTop] = useState(0);
  const refTopPosition = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((prev) => {
        if (hasAnswer) {
          refTopPosition.current = prev;

          return prev;
        }
        if (prev + 10 < 500) {
          const add = prev + 10;
          refTopPosition.current = add;

          return add;
        }
        if (prev >= 500) {
          setTimeout(() => {
            refTopPosition.current = 0;
            // setFinishRound(true);
          }, ANIMATION_DELAY);
        }
        refTopPosition.current = 500;
        return 500;
      });
    }, ANIMATION_DURATION);

    if (hasAnswer) {
      clearInterval(interval);
    }

    return () => {
      setTop(0);
      clearInterval(interval);
    };
  }, [hasAnswer]);

  useEffect(() => {
    setTop(0);
    refTopPosition.current = 0;
  }, [word]);

  const styleDrop = {
    top: `${top || refTopPosition.current}px`,
    transition: `top ${ANIMATION_DURATION}ms linear`,
    opacity: 1,
  };

  return (
    <QuestionWrapper>
      <CurrentWord style={top || refTopPosition.current ? styleDrop : {}}>
        {word.word}
      </CurrentWord>
    </QuestionWrapper>
  );
};
