import {CATEGORIES_RECEIVED} from './actions';

export function categoriesReducer(state, action) {
    switch (action.type) {
        case CATEGORIES_RECEIVED:
            return Object.assign({}, state, {categories: action.categories})
        default:
            return state;
    }
}

export default categoriesReducer;