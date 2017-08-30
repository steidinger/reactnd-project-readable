import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import createStore from './store.js';
import {fetchCategories, fetchPosts} from './actions.js';

const store = createStore();
store.dispatch(fetchCategories());
store.dispatch(fetchPosts());

ReactDOM.render(<Root store={store}></Root>, document.getElementById('root'));
