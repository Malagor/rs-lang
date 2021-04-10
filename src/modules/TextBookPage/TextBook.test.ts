import React from 'react';
import * as actions from './actions';
import { textBookPageState, textBookReducer } from './textBookReducer';

const word = {
  id: '1',
  group: 1,
  page: 1,
  word: 'word',
  image: 'url/image',
  audio: 'utl/audio',
  audioMeaning: 'utl/audioMeaning',
  audioExample: 'utl/example',
  textMeaning: 'textMeaning',
  textExample: 'textExample',
  transcription: 'transcription',
  wordTranslate: 'перевод слова',
  textMeaningTranslate: 'перевод значения слова',
  textExampleTranslate: 'перевод примера со словом',
};

describe('TextBook page state tests', () => {
  test('The number of group must be changed', () => {
    const action = actions.setGroup(2);
    const state = textBookReducer(textBookPageState, action);

    expect(state.group).toBe(2);
  });

  test('The number of Page must be changed', () => {
    const action = actions.setPage(5);
    const state = textBookReducer(textBookPageState, action);

    expect(state.page).toBe(5);
  });

  test('The played sound must be added', () => {
    const action = actions.setPlayedSound('MySound');
    const state = textBookReducer(textBookPageState, action);

    expect(state.playedSound).toBe('MySound');
  });

  test('The error must be set and then cleared', () => {
    const error = { message: 'Some error occurred' };
    const action = actions.setWordsError(error);
    let state = textBookReducer(textBookPageState, action);

    expect(state.error).toBe(error);

    const clearErrorAction = actions.clearWordsError();
    state = textBookReducer(textBookPageState, clearErrorAction);

    expect(state.error).toBeNull();
  });

  test('The sound must be added', () => {
    const audio = new Audio('url');
    const sounds = [audio];
    const action = actions.setSound(sounds);
    const state = textBookReducer(textBookPageState, action);

    expect(state.sounds).toHaveLength(1);
    expect(state.sounds[0]).toBe(audio);
  });

  test('The words must be added', () => {
    const action = actions.setWords([word, word, word]);
    const state = textBookReducer(textBookPageState, action);

    expect(state.words).toHaveLength(3);
    expect(state.words[0]).toBe(word);
    expect(state.words[0].id).toBe('1');
    expect(new Number(state.words[0].group)).toBeInstanceOf(Number);
    expect(state.words[0].word.length).toBeLessThan(10);
  });
});

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

describe('TextBook page thunk tests', () => {
  test('Thunk loadWords must call dispatch', async () => {
    const thunk = actions.loadWords(0, 0);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalled();
  });
});
