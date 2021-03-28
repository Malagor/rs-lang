import { SET_AUDIO_WORDS } from './actionConsts';

export const setAudioWords = (payload: number) => ({
  type: SET_AUDIO_WORDS,
  payload,
});
