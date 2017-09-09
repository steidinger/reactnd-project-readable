import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import createStore from './state/store.js';
import {fetchCategories} from './state/actions/categories';
import {fetchPosts} from './state/actions/posts';

const store = createStore();
store.dispatch(fetchCategories());
store.dispatch(fetchPosts());

ReactDOM.render(<Root store={store}></Root>, document.getElementById('root'));
