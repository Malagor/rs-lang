import { Reducer } from 'redux';
import { StateAudioGame } from 'types';
import {
  SET_AUDIO_ERROR,
  SET_AUDIO_WORDS,
  SET_AUDIO_CURRENT,
  SET_AUDIO_FINISH,
  SET_AUDIO_IS_ANSWER,
  SET_AUDIO_USER_ANSWER,
  SET_AUDIO_INCORRECT_WORDS,
  SET_AUDIO_CORRECT_WORDS,
  SET_AUDIO_CHAIN,
  SET_AUDIO_LONGER_CHAIN,
} from './actionConsts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const audioGameState: StateAudioGame = {
  error: null,
  current: 0,
  isAnswer: false,
  isFinish: false,
  userAnswer: '',
  words: [],
  correctWord: [],
  incorrectWord: [],
  chain: 0,
  longerChain: 0,
};

export const audioGameReducer: Reducer<StateAudioGame, Action> = (
  state = audioGameState,
  action: Action
) => {
  switch (action.type) {
    case SET_AUDIO_WORDS:
      return {
        ...state,
        words: action.payload,
      };

    case SET_AUDIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_AUDIO_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case SET_AUDIO_FINISH:
      return {
        ...state,
        isFinish: action.payload,
      };

    case SET_AUDIO_IS_ANSWER:
      return {
        ...state,
        isAnswer: action.payload,
      };

    case SET_AUDIO_USER_ANSWER:
      return {
        ...state,
        userAnswer: action.payload,
      };

    case SET_AUDIO_CHAIN:
      return {
        ...state,
        chain: action.payload,
      };

    case SET_AUDIO_LONGER_CHAIN:
      return {
        ...state,
        longerChain: action.payload,
      };

    case SET_AUDIO_CORRECT_WORDS:
      return {
        ...state,
        correctWord: [...state.correctWord, action.payload],
      };

    case SET_AUDIO_INCORRECT_WORDS:
      return {
        ...state,
        incorrectWord: [...state.incorrectWord, action.payload],
      };

    default:
      return state;
  }
};
