import moment from 'moment';
import uuid from 'uuid';
export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';
export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_UPDATED = 'POST_UPDATED';
export const SORT_POSTS = 'SORT_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const POST_ADDED = 'POST_ADDED';
export const POST_SAVED = 'POST_SAVED';
export const EDIT_POST_FINISHED = 'EDIT_POST_FINISHED';
export const ADD_VOTE = 'ADD_VOTE';

const categoriesReceived = categories => ({ type: CATEGORIES_RECEIVED, categories });
const postsReceived = posts => ({ type: POSTS_RECEIVED, posts });
const postUpdated = post => ({ type: POST_UPDATED, post });
const commentsReceived = comments => ({ type: COMMENTS_RECEIVED, comments });
export const voteAdded = (post_id, vote) => ({ type: ADD_VOTE, post_id, vote });
export const editPost = post => ({ type: EDIT_POST, post });
export const editPostFinished = () => ({ type: EDIT_POST_FINISHED });

function doGet(path, options = {}) {
    options.headers = Object.assign({}, options.headers, {Authorization: 'faked'});
    return fetch(`http://localhost:5001/${path}`, options);
}

function doPost(path, body) {
    return doGet(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

function doPut(path, body) {
    return doGet(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

export function fetchCategories() {
    return (dispatch) => {
        doGet('categories')
            .then(response => response.json())
            .then(json => dispatch(categoriesReceived(json.categories)));
    }
}

export function fetchPosts() {
    return (dispatch) => {
        doGet('posts')
            .then(response => response.json())
            .then(posts => {
                dispatch(postsReceived(posts));
                // need to fetch comments for each post so that number of comments can be displayed
                // to bad that there is no api to get all comments with one request
                posts.forEach(post => dispatch(fetchComments(post)));
            });
    }
}

export function fetchComments(post) {
    return (dispatch) => {
        const path = `posts/${post.id}/comments`;
        doGet(path)
            .then(response => response.json())
            .then(comments => dispatch(commentsReceived(comments)));
    }
}

export function addVote(post_id, vote) {
    return (dispatch) => {
        // optimistic update: reflect new state immediately
        dispatch(voteAdded(post_id, vote));
        doPost(`posts/${post_id}`, {option: vote > 0 ? 'upVote' : 'downVote'})
        .then(response => response.json())
        .then(post => dispatch(postUpdated(post)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function addPost(post) {
    return (dispatch) => {
        post.id = uuid.v4();
        post.timestamp = moment().valueOf();
        dispatch(postUpdated(post));
        doPost('posts', post)
        .then(response => response.json())
        .then(json => dispatch(postUpdated(json)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function savePost(post) {
    return (dispatch) => {
        dispatch(postUpdated(post));
        doPut(`posts/${post.id}`, {title: post.title, body: post.body })
        .then(response => response.json())
        .then(json => dispatch(postUpdated(json)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export const sortPosts = (sortField) => {
    switch (sortField) {
        case "voteScore":
            return ({ type: SORT_POSTS, sortField: 'voteScore', ascending: false });
        case "author":
            return ({ type: SORT_POSTS, sortField: 'author' });
        case "category":
            return ({ type: SORT_POSTS, sortField: 'category' });
        case "timestamp":
            return ({ type: SORT_POSTS, sortField: 'timestamp', ascending: false });
        default:
            throw new Error(`Unsupported sortField: ${sortField}`);
    }
};
