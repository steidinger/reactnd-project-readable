import React, { Component } from 'react';
import './App.css';
import CategoriesMenu from './components/CategoriesMenu';
import Posts from './components/Posts';
import SortOrderSelector from './components/SortOrderSelector';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CategoriesMenu />
        <SortOrderSelector />
        <Posts />
      </div>
    );
  }
}

export default App;
