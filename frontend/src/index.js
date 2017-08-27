import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import createStore from './store.js';
import {fetchCategories, fetchPosts} from './actions.js';

const store = createStore();
store.dispatch(fetchCategories());
store.dispatch(fetchPosts());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
