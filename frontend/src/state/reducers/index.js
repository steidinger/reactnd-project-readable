import {combineReducers} from 'redux';
import categories from './categories';
import comments from './comments';
import posts from './posts';
import postsApp from './ui';

export default combineReducers({
  categories,
  comments,
  posts,
  postsApp
});