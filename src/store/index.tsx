import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { State } from 'types';
import { textBookReducer } from 'modules/TextBookPage/textBookReducer';
import { loginReducer } from 'modules/Login/loginReducer';
import { statisticsReducer } from 'modules/StatisticsPage/statisticsReducer';
import { commonReducer } from './commonState/commonReducer';

const appReducer = combineReducers<State>({
  textBookReducer,
  loginReducer,
  statisticsReducer,
  commonReducer,
});

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export const AppState: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
