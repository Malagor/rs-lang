import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { State } from 'types';
import { textBookReducer } from '../modules/TextBookPage/textBookReducer';
import { commonReducer } from './commonState/commonReducer';
import { loginReducer } from '../modules/Login/loginReducer';

const appReducer = combineReducers<State>({
  textBookReducer,
  loginReducer,
  commonReducer,
});

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export const AppState: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
