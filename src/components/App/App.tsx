import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  DictionaryPage,
  GamesPage,
  MainPage,
  StatisticsPage,
  TextBookPage,
  AudioChallenge,
  Savannah,
  Sprint,
  OwnGame,
} from 'modules';
import * as URL from 'appConstants/url';
import { Layout } from 'components';
import { useDispatch } from 'react-redux';
import { database, LocStore } from 'services';
import { loadUserInfoById, setAuth } from 'modules/Login/actions';
import { Auth } from 'types';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authStr = LocStore.getUser();
    if (authStr) {
      const auth: Auth = JSON.parse(authStr);
      dispatch(setAuth(auth));

      const { token, userId: id } = auth;
      console.log('token', token);
      console.log('id', id);
      database.setToken(token);

      dispatch(loadUserInfoById(id));
    }
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path={URL.URL_TEXT_BOOK} component={TextBookPage} />
        <Route path={URL.URL_GAME_AUDIO_CHALLENGE} component={AudioChallenge} />
        <Route path={URL.URL_GAME_OWN_GAME} component={OwnGame} />
        <Route path={URL.URL_GAME_SAVANNA} component={Savannah} />
        <Route path={URL.URL_GAME_SPRINT} component={Sprint} />
        <Route path={URL.URL_DICTIONARY} component={DictionaryPage} />
        <Route path={URL.URL_GAMES} component={GamesPage} />
        <Route path={URL.URL_STATISTICS} component={StatisticsPage} />
        <Route exact path={URL.URL_MAIN_PAGE} component={MainPage} />
      </Switch>
    </Layout>
  );
};
