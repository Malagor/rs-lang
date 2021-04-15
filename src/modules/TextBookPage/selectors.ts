import { State } from 'types';

export const selectTextBookWords = (state: State) =>
  state.textBookReducer.words;

export const selectGameWords = (state: State) =>
  state.textBookReducer.gameWords;

export const selectGameWordsKind = (state: State) =>
  state.textBookReducer.gameWordsKind;

export const selectTextBookPage = (state: State) => state.textBookReducer.page;

export const selectTextBookGroup = (state: State) =>
  state.textBookReducer.group;

export const selectDictionaryPage = (state: State) =>
  state.textBookReducer.dictionaryPage;

export const selectDictionaryGroup = (state: State) =>
  state.textBookReducer.dictionaryGroup;

export const selectTextBookSounds = (state: State) =>
  state.textBookReducer.sounds;

export const selectTextBookError = (state: State) =>
  state.textBookReducer.error;

export const selectPlayedSound = (state: State) =>
  state.textBookReducer.playedSound;

export const selectCheckedDifficulties = (state: State) =>
  state.textBookReducer.checkedDifficulties;

export const selectPagesCount = (state: State) =>
  state.textBookReducer.pagesCount;

export const selectWordSection = (state: State) =>
  state.textBookReducer.wordSection;

export const selectIsLoading = (state: State) =>
  state.textBookReducer.isLoading;

export const selectRefStatistic = (state: State) =>
  state.textBookReducer.refStatistic;

export const selectIsTranslate = (state: State) =>
  state.textBookReducer.isTranslate;

export const selectIsButtons = (state: State) =>
  state.textBookReducer.isButtons;
