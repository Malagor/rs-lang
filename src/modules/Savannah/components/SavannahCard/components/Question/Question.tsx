import React, { FC, useEffect, useRef, useState } from 'react';
import { Word } from 'types';
import { CurrentWord, QuestionWrapper } from './styled';
import { UserAnswer } from '../../SavannahCard';

type QuestionProps = {
  word: Word;
  userAnswerState: UserAnswer;
  setAnimation?: (flag: boolean) => void;
  setFinishRound: (flag: boolean) => void;
  setUserAnswer: (index: number) => void;
};

const ANIMATION_DELAY = 1000;
const ANIMATION_DURATION = 30;

export const Question: FC<QuestionProps> = ({
  word,
  userAnswerState,
  setFinishRound,
  setUserAnswer,
}) => {
  const [top, setTop] = useState(0); // position word
  const refTopPosition = useRef(0); // last top word position
  const [end, setEnd] = useState(false); // word has dropped down

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((prev) => {
        if (userAnswerState !== UserAnswer.NO_ANSWER) {
          refTopPosition.current = prev;
          return prev;
        }
        if (prev + 10 < 500) {
          const add = prev + 10;
          refTopPosition.current = add;

          return add;
        }

        setEnd(true);
        if (userAnswerState === UserAnswer.NO_ANSWER) {
          setUserAnswer(100);
        }

        // setFinishRound(true);
        refTopPosition.current = 500;
        return 500;
      });
    }, ANIMATION_DURATION);

    if (userAnswerState !== UserAnswer.NO_ANSWER) {
      clearInterval(interval);
      setTop(0);

      // setFinishRound(true);
    }

    return () => {
      if (userAnswerState !== UserAnswer.NO_ANSWER) setTop(0);
      setEnd(false);
      clearInterval(interval);
    };
  }, [setUserAnswer, userAnswerState]);

  useEffect(() => {
    setTop(0);
    refTopPosition.current = 0;
  }, [word]);

  const styleDrop = {
    top: `${top || refTopPosition.current}px`,
    transition: `top ${ANIMATION_DURATION}ms linear`,
    opacity: 1,
  };

  // console.log('end', end);

  return (
    <QuestionWrapper>
      <CurrentWord
        style={top || refTopPosition.current ? styleDrop : {}}
        userAnswerState={userAnswerState}
        isEnd={end}
      >
        {word.word}
      </CurrentWord>
    </QuestionWrapper>
  );
};
