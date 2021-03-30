import React, { FC } from 'react';
import { Word } from 'types';

import { useDispatch } from 'react-redux';
import { Answers, Question } from './components';
import { AudioCartStyled } from './styled';
import {
  setCorrectWords,
  setIncorrectWords,
  setIsAnswer,
  setUserAnswer,
} from '../../actions';

type AudioCardProps = {
  word: Word;
  variants: string[];
};

export const AudioCard: FC<AudioCardProps> = ({ word, variants }) => {
  const dispatch = useDispatch();

  const handlerUserAnswer = (userAnswer: string) => {
    console.log('word.wordTranslate', word.wordTranslate);
    console.log('userAnswer', userAnswer);
    if (word.wordTranslate === userAnswer) {
      dispatch(setCorrectWords(word));
    } else {
      dispatch(setIncorrectWords(word));
    }
    dispatch(setIsAnswer(true));
    dispatch(setUserAnswer(userAnswer));
  };

  return (
    <AudioCartStyled>
      <Question word={word} />
      <Answers
        answers={variants}
        correctAnswer={word.wordTranslate}
        onUserAnswer={handlerUserAnswer}
      />
    </AudioCartStyled>
  );
};
