import React, { Component } from 'react';
import './App.css';
import CategoriesMenu from './components/CategoriesMenu';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CategoriesMenu />
        <Posts />
      </div>
    );
  }
}

export default App;
