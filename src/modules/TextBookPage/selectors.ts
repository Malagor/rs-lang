import { State } from 'types';

export const selectWords = (state: State) => state.textBookReducer.words;

export const selectPage = (state: State) => state.textBookReducer.page;

export const selectGroup = (state: State) => state.textBookReducer.group;

export const selectSounds = (state: State) => state.textBookReducer.sounds;
