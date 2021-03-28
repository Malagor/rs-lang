import { Reducer } from 'redux';
import { StateAudioGame } from 'types';
import { SET_AUDIO_ERROR, SET_AUDIO_WORDS } from './actionConsts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const audioGameState: StateAudioGame = {
  words: [],
  error: null,
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

    default:
      return state;
  }
};
