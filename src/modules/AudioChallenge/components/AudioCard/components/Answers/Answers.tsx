import React, { FC } from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { AnswersWrapper } from './styled';
import { AnswerRadio } from './components/AnswerRadio';

type AnswersProps = {
  answers: string[];
  correctAnswerIndex: string;
  onUserAnswer: (userAnswer: string) => void;
  userChoice: string;
};

export const Answers: FC<AnswersProps> = ({
  answers,
  correctAnswerIndex,
  onUserAnswer,
  userChoice,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUserAnswer(event.target.value);
  };

  return (
    <AnswersWrapper>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="answers"
          name="answers"
          value={userChoice}
          onChange={handleChange}
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              key={answer}
              value={index.toString()}
              control={
                <AnswerRadio
                  iscorrect={`${index === parseInt(correctAnswerIndex, 10)}`}
                />
              }
              label={`${index + 1} ${answer}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </AnswersWrapper>
  );
};
