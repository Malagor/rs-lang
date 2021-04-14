import React, { FC } from 'react';
import { Word } from 'types';

import { Answers, Question } from './components';
import { SavannahCartStyled } from './styled';

type Props = {
  word: Word;
  variants: string[];
  correctIndex: string;
  onUserAnswer: (answerIndex: string) => void;
  userChoice: string;
  // onFinishRound: (flag: boolean) => void;
};

export const SavannahCard: FC<Props> = ({
  word,
  variants,
  correctIndex,
  onUserAnswer,
  userChoice,
  // onFinishRound,
}) => {
  const hasAnswer = userChoice !== '-1';

  return (
    <SavannahCartStyled>
      <Question
        word={word}
        hasAnswer={hasAnswer}
        // setFinishRound={onFinishRound}
      />
      <Answers
        answers={variants}
        correctAnswerIndex={correctIndex}
        onUserAnswer={onUserAnswer}
        userChoice={userChoice}
      />
    </SavannahCartStyled>
  );
};
