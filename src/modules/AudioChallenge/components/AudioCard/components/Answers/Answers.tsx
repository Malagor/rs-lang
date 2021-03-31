import React, { FC, useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { AnswersWrapper } from './styled';
import { AnswerRadio } from './components/AnswerRadio';

type AnswersProps = {
  answers: string[];
  correctAnswer: number;
  onUserAnswer: (userAnswer: number) => void;
};

export const Answers: FC<AnswersProps> = ({
  answers,
  correctAnswer,
  onUserAnswer,
}) => {
  const [value, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onUserAnswer(parseInt(value, 10) - 1);
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
              value={`${index}`}
              control={<AnswerRadio iscorrect={`${index === correctAnswer}`} />}
              label={`${index} ${answer}`}
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
