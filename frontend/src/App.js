import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import CategoriesMenu from './components/CategoriesMenu';
import IndexView from './views/IndexView';
import PostDetailsView from './views/PostDetailsView';
import PostEditView from './views/PostEditView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="banner">
          <Link to="/">Home</Link>
        </div>
        <CategoriesMenu />
        <Switch>
          <Route path="/" exact component={IndexView} />
          <Route path="/post/add" component={PostEditView} />
          <Route path="/:category">
            <Switch>
              <Route path="/:category" exact component={IndexView} />
              <Route path="/:category/:post_id/edit" component={PostEditView} />
              <Route path="/:category/:post_id" component={PostDetailsView} />
            </Switch>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
