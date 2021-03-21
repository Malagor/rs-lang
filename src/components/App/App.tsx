import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainPage, TextBookPage } from 'modules';
import { Layout } from 'components';

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/textbook" component={TextBookPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
}
