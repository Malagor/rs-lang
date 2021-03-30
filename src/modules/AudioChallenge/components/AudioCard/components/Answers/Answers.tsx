import React, { FC, useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { AnswersWrapper } from './styled';
import { AnswerRadio } from './components/AnswerRadio';

type AnswersProps = {
  answers: string[];
  correctAnswer: string;
  onUserAnswer: (userAnswer: string) => void;
};

export const Answers: FC<AnswersProps> = ({
  answers,
  correctAnswer,
  onUserAnswer,
}) => {
  const [value, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onUserAnswer(value);
  };

  return (
    <AnswersWrapper>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="answers"
          name="answers"
          value={value}
          onChange={handleChange}
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              key={answer}
              value={answer}
              control={
                <AnswerRadio iscorrect={`${correctAnswer === answer}`} />
              }
              label={`${index + 1} ${answer}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* <AnswerItem key={answer}> */}
      {/*  {index + 1} {answer} */}
      {/* </AnswerItem> */}
    </AnswersWrapper>
  );
};
