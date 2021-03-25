import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GamesPage, MainPage, StatisticsPage, TextBookPage } from 'modules';
import { Layout } from 'components';
import { Savannah } from 'modules/Savannah';
import { Sprint } from 'modules/Sprint';
import { AudioChallenge } from 'modules/AudioChallenge';
import { OwnGame } from 'modules/OwnGame';

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/textbook" component={TextBookPage} />
        <Route path="/games/audioChallenge" component={AudioChallenge} />
        <Route path="/games/ownGame" component={OwnGame} />
        <Route path="/games/savannah" component={Savannah} />
        <Route path="/games/sprint" component={Sprint} />
        <Route path="/games" component={GamesPage} />
        <Route path="/statistics" component={StatisticsPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
}
