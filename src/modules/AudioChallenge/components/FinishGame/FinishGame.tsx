import React, { FC, RefObject } from 'react';
import { Word } from 'types';
import { NextButton } from '../NextButton';

type FinishGameProps = {
  onFinishGameHandler: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
  correctWords: Word[];
  incorrectWord: Word[];
  longerChain: number;
};

export const FinishGame: FC<FinishGameProps> = ({
  onFinishGameHandler,
  buttonRef,
  correctWords,
  incorrectWord,
  longerChain,
}) => (
  <div>
    <h2>Statistics:</h2>
    <div>All words: {correctWords.length + incorrectWord.length}</div>
    <div>Correct answers: {correctWords.length}</div>
    <div>Incorrect answers: {incorrectWord.length}</div>
    <div>Longer Chain: {longerChain}</div>
    <h3>Correct List</h3>
    <ul>
      {correctWords.map((word) => (
        <li key={word.word}>{word.word}</li>
      ))}
    </ul>
    <h3>Incorrect List</h3>
    <ul>
      {incorrectWord.map((word) => (
        <li key={word.word}>{word.word}</li>
      ))}
    </ul>
    <NextButton
      label="again"
      clickHandler={onFinishGameHandler}
      buttonRef={buttonRef}
    />
  </div>
);
