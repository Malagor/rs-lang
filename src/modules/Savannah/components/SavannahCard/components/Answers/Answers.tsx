import React, { FC } from 'react';

import {
  FormControl,
  FormControlLabel,
  makeStyles,
  RadioGroup,
} from '@material-ui/core';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BACKGROUND_RGB,
} from 'appConstants/colors';
import { AnswersWrapper } from './styled';
import { AnswerRadio } from './components/AnswerRadio';

type AnswersProps = {
  answers: string[];
  correctAnswerIndex: string;
  onUserAnswer: (userAnswer: string) => void;
  userChoice: string;
};

const answerItemStyle = {
  color: `${COLOR_LAYOUT_BACKGROUND}`,
  padding: '8px 16px',
  cursor: 'pointer',
  transition: '0.3s',

  '&:hover': {
    backgroundColor: `rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.3)`,
  },
};

export const useStyles = makeStyles({
  root: {
    color: `${COLOR_LAYOUT_BACKGROUND}`,
    padding: '8px 16px 8px 12px',
    cursor: 'pointer',
    transition: '0.3s',

    '&:last-child': {
      marginRight: 0,
    },

    '&:hover': {
      backgroundColor: `rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.3)`,
    },
  },
  disabled: {
    color: `${COLOR_LAYOUT_BACKGROUND} !important`,
  },
});

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
                style={answerItemStyle}
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
