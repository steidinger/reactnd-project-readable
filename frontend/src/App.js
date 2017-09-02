import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import IndexView from './components/IndexView';
import PostDetailsView from './components/PostDetailsView';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="banner">
          <Link to="/">Home</Link>
        </div>
        <Switch>
          <Route path='/' exact component={IndexView} />
          <Route path='/:category' exact component={IndexView} />
          <Route path='/:category/:post_id' component={PostDetailsView} />
        </Switch>
      </div>
    );
  }
}

export default App;
