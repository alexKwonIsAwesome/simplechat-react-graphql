import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Chat from './pages/Chat';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/chat" component={Chat} />
      </Switch>
    );
  }
}

export default App;
