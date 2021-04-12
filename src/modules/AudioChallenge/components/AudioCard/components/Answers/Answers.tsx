import React, { FC } from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { AnswersWrapper, useStyles } from './styled';
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
  const classes = useStyles();

  return (
    <AnswersWrapper>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="answers"
          name="answers"
          value={userChoice}
          onChange={handleChange}
          style={{ justifyContent: 'center', gap: '0' }}
        >
          {answers.map((answer, index) => {
            const activeItem = parseInt(userChoice, 10) === index;

            return (
              <FormControlLabel
                key={answer}
                classes={{
                  root: classes.root,
                  disabled: activeItem ? classes.disabled : '',
                }}
                value={index.toString()}
                control={
                  <AnswerRadio
                    iscorrect={`${index === parseInt(correctAnswerIndex, 10)}`}
                  />
                }
                label={`${index + 1} ${answer}`}
                disabled={userChoice !== '-1'}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </AnswersWrapper>
  );
};
