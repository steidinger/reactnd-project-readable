import {CATEGORIES_RECEIVED} from './types';
import {doGet} from './fetch-helpers';

export const categoriesReceived = categories => ({type: CATEGORIES_RECEIVED, categories});

export function fetchCategories() {
  return (dispatch) => {
    doGet('categories')
      .then(response => response.json())
      .then(json => dispatch(categoriesReceived(json.categories)));
  };
}
