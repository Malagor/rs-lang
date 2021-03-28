import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { State } from 'types';
import { commonReducer } from 'store/commonState/commonReducer';
import { textBookReducer } from 'modules/TextBookPage/textBookReducer';
import { loginReducer } from 'modules/Login/loginReducer';
import { audioGameReducer } from 'modules/AudioChallenge/audioChallengeReducer';

const appReducer = combineReducers<State>({
  commonReducer,
  textBookReducer,
  loginReducer,
  audioGameReducer,
});

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export const AppState: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
