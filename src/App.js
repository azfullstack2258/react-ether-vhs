import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react'

import LatestBlocks from './containers/ethereum/LatestBlocks';
import BlockContainer from './containers/ethereum/BlockContainer';
import store, { history, persistor } from './store';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
          >
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path='/' component={LatestBlocks} />
                <Route path='/block/:id' component={BlockContainer} />
              </Switch>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;