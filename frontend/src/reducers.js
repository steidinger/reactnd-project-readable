import { combineReducers } from 'redux';
import {
    ADD_VOTE,
    CATEGORIES_RECEIVED,
    COMMENTS_RECEIVED,
    EDIT_POST,
    EDIT_POST_FINISHED,
    POST_DELETED,
    POSTS_RECEIVED,
    POST_UPDATED,
    SORT_POSTS
} from './actions';

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
            return action.posts.reduce((newState, p) => {
                if (!p.deleted) {
                    newState[p.id] = p;
                }
                return newState;
            }, {});
        case POST_UPDATED:
            return {...state, [action.post.id]: action.post};
        case POST_DELETED:
            return Object.keys(state)
                .filter(id => id !== action.id)
                .reduce((newState, id) => {
                    newState[id] = state[id];
                    return newState;
                }, {});
        case ADD_VOTE:
            const originalPost = state[action.post_id];
            if (originalPost) {
                const updatedPost = {
                    ...originalPost, 
                    voteScore: originalPost.voteScore += action.vote 
                };
                return {...state, [action.post_id]: updatedPost };
            }
            return state;
        default:
            return state;
    }
}

export function comments(state = {}, action) {
    switch (action.type) {
        case COMMENTS_RECEIVED:
            const received = action.comments.reduce((collector, c) => {
                collector[c.id] = c;
                return collector;
            }, {});
            return {...state, ...received};
        default:
            return state;
    }
}

export function postsApp(state = { sortField: 'voteScore', sortAscending: false, currentlyEditedPost: undefined }, action) {
    switch (action.type) {
        case SORT_POSTS:
            return {
                ...state,
                sortField: action.sortField,
                sortAscending: action.ascending
            };
        case EDIT_POST:
            return {
                ...state,
                currentlyEditedPost: action.post
            }
        case EDIT_POST_FINISHED:
            return {
                ...state,
                currentlyEditedPost: undefined
            }
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    comments,
    posts,
    postsApp
});