import React, { FC, useEffect, useRef, useState } from 'react';
import { Word } from 'types';
import { CurrentWord, QuestionWrapper } from './styled';
import { UserAnswer } from '../../SavannahCard';

type QuestionProps = {
  word: Word;
  userAnswerState: UserAnswer;
  setAnimation?: (flag: boolean) => void;
  setFinishRound: (flag: boolean) => void;
};

const ANIMATION_DELAY = 1000;
const ANIMATION_DURATION = 100;

export const Question: FC<QuestionProps> = ({
  word,
  userAnswerState,
  setFinishRound,
}) => {
  const [top, setTop] = useState(0);
  const refTopPosition = useRef(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((prev) => {
        if (userAnswerState !== UserAnswer.NO_ANSWER) {
          refTopPosition.current = prev;
          // setFinishRound(true);
          return prev;
        }
        if (prev + 10 < 500) {
          const add = prev + 10;
          refTopPosition.current = add;

          return add;
        }
        if (prev >= 500) {
          setEnd(true);
          setTimeout(() => {
            // console.log('500');
            refTopPosition.current = 0;
            setFinishRound(true);
          }, ANIMATION_DELAY);
        }
        refTopPosition.current = 500;
        // setFinishRound(true);
        return 500;
      });
    }, ANIMATION_DURATION);

    if (userAnswerState !== UserAnswer.NO_ANSWER) {
      clearInterval(interval);
      // setTimeout(()=>{
      setFinishRound(true);
      // }, 1000)
    }

    return () => {
      if (userAnswerState !== UserAnswer.NO_ANSWER) setTop(0);
      setEnd(false);
      clearInterval(interval);
    };
  }, [userAnswerState, setFinishRound]);

  useEffect(() => {
    setTop(0);
    refTopPosition.current = 0;
  }, [word]);

  const styleDrop = {
    top: `${top || refTopPosition.current}px`,
    transition: `top ${ANIMATION_DURATION}ms linear`,
    opacity: 1,
  };

  console.log('end', end);

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
