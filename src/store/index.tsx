import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { State } from 'types';
import { textBookReducer } from '../modules/TextBookPage/textBookReducer';
import { commonReducer } from './commonState/commonReducer';
import { loginReducer } from '../modules/Login/loginReducer';
import { statisticsReducer } from '../modules/StatisticsPage/statisticsReducer';

const appReducer = combineReducers<State>({
  textBookReducer,
  loginReducer,
  statisticsReducer,
  commonReducer,
});

export const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export const AppState: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
