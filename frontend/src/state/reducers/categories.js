import {CATEGORIES_RECEIVED} from '../actions/types';

export default function categories(state = [], action) {
  switch (action.type) {
  case CATEGORIES_RECEIVED:
    return action.categories;
  default:
    return state;
  }
}
