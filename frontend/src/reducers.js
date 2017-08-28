import {combineReducers} from 'redux';
import {CATEGORIES_RECEIVED, POSTS_RECEIVED, SORT_POSTS} from './actions';

export function categories(state = [], action) {
    switch (action.type) {
        case CATEGORIES_RECEIVED:
            return action.categories;
        default:
            return state;
    }
}

export function posts(state = {}, action) {
    switch (action.type) {
        case POSTS_RECEIVED:
            return action.posts.reduce((collector, p) => {
                collector[p.id] = p;
                return collector;
            }, {});
        default:
            return state;
    }
}

export function postsApp(state = {sortField: 'voteScore', sortAscending: false}, action) {
    switch (action.type) {
        case SORT_POSTS:
            return { 
                ...state,
                sortField: action.sortField, 
                sortAscending: action.ascending
            };
        default:
            return state;
    }
}

export default combineReducers({
    categories, 
    posts,
    postsApp
});