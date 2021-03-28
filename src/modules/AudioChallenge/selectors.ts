import { State } from 'types';

export const selectAudioWords = (state: State) => state.audioGameReducer.words;
