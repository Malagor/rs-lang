import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ImagineeryGame,
  MainPage,
  StatisticsPage,
  TextBookPage,
} from 'modules';
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
      database.setToken(token);
      dispatch(loadUserInfoById(id));
    }
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/textbook" component={TextBookPage} />
        <Route path="/games" component={ImagineeryGame} />
        <Route path="/statistics" component={StatisticsPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
};
