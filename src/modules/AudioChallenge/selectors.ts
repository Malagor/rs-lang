import { State } from 'types';

export const selectAudioWords = (state: State) => state.audioGameReducer.words;

export const selectAudioError = (state: State) => state.audioGameReducer.error;

export const selectAudioFinish = (state: State) =>
  state.audioGameReducer.isFinish;

export const selectAudioIsAnswer = (state: State) =>
  state.audioGameReducer.isAnswer;

export const selectAudioUserAnswer = (state: State) =>
  state.audioGameReducer.userAnswer;

export const selectAudioCurrentWord = (state: State) =>
  state.audioGameReducer.current;

export const selectAudioCorrectWord = (state: State) =>
  state.audioGameReducer.correctWord;

export const selectAudioIncorrectWord = (state: State) =>
  state.audioGameReducer.incorrectWord;

export const selectAudioChain = (state: State) => state.audioGameReducer.chain;

export const selectAudioLongerChain = (state: State) =>
  state.audioGameReducer.longerChain;
