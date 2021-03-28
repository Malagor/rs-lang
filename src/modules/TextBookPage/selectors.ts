import { State } from 'types';

export const selectTextBookWords = (state: State) =>
  state.textBookReducer.words;

export const selectTextBookPage = (state: State) => state.textBookReducer.page;

export const selectTextBookGroup = (state: State) =>
  state.textBookReducer.group;

export const selectTextBookSounds = (state: State) =>
  state.textBookReducer.sounds;

export const selectTextBookError = (state: State) =>
  state.textBookReducer.error;
