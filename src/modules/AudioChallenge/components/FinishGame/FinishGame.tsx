import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NextButton } from '../NextButton';
import {
  selectAudioCorrectWord,
  selectAudioIncorrectWord,
  selectAudioLongerChain,
} from '../../selectors';

type FinishGameProps = {
  onFinishGameHandler: () => void;
};

export const FinishGame: FC<FinishGameProps> = ({ onFinishGameHandler }) => {
  const correctWords = useSelector(selectAudioCorrectWord);
  const incorrectWord = useSelector(selectAudioIncorrectWord);
  const longerChain = useSelector(selectAudioLongerChain);

  return (
    <div>
      <h2>Statistics:</h2>
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
      <NextButton label="again" clickHandler={onFinishGameHandler} />
    </div>
  );
};
