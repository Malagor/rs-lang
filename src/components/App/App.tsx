import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GamesPage, MainPage, StatisticsPage, TextBookPage } from 'modules';
import { Layout } from 'components';

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/textbook" component={TextBookPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/statistics" component={StatisticsPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
}
