import moment from 'moment';
import uuid from 'uuid';
export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';
export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_UPDATED = 'POST_UPDATED';
export const SORT_POSTS = 'SORT_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const POST_ADDED = 'POST_ADDED';
export const POST_DELETED = 'POST_DELETED';
export const POST_SAVED = 'POST_SAVED';
export const EDIT_POST_FINISHED = 'EDIT_POST_FINISHED';
export const ADD_VOTE_FOR_POST = 'ADD_VOTE_FOR_POST';
export const ADD_VOTE_FOR_COMMENT = 'ADD_VOTE_FOR_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_FINISHED = 'EDIT_COMMENT_FINISHED';
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENT_DELETED = 'COMMENT_DELETED';

const categoriesReceived = categories => ({ type: CATEGORIES_RECEIVED, categories });
const postsReceived = posts => ({ type: POSTS_RECEIVED, posts });
const postUpdated = post => ({ type: POST_UPDATED, post });
const postDeleted = id => ({ type: POST_DELETED, id });
const commentsReceived = comments => ({ type: COMMENTS_RECEIVED, comments });
const commentUpdated = comment => ({ type: COMMENT_UPDATED, comment });
const commentDeleted = id => ({ type: COMMENT_DELETED, id });
export const voteForPostAdded = (post_id, vote) => ({ type: ADD_VOTE_FOR_POST, post_id, vote });
export const voteForCommentAdded = (comment_id, vote) => ({ type: ADD_VOTE_FOR_COMMENT, comment_id, vote });
export const editPost = post => ({ type: EDIT_POST, post });
export const editPostFinished = () => ({ type: EDIT_POST_FINISHED });
export const editComment = comment => ({ type: EDIT_COMMENT, comment });
export const editCommentFinished = () => ({ type: EDIT_COMMENT_FINISHED });

function doGet(path) {
    return fetch(`http://localhost:5001/${path}`, {
        headers: {Authorization: 'faked'}
    });
}

function doDelete(path) {
    return fetch(`http://localhost:5001/${path}`, {
        method: 'DELETE',
        headers: {Authorization: 'faked'}
    });
}

function doPost(path, body) {
    return fetch(`http://localhost:5001/${path}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: 'faked' 
        },
        body: JSON.stringify(body)
    });
}

function doPut(path, body) {
    return fetch(`http://localhost:5001/${path}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: 'faked' 
        },
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

export function addVoteForPost(post_id, vote) {
    return (dispatch) => {
        // optimistic update: reflect new state immediately
        dispatch(voteForPostAdded(post_id, vote));
        doPost(`posts/${post_id}`, {option: vote > 0 ? 'upVote' : 'downVote'})
        .then(response => response.json())
        .then(post => dispatch(postUpdated(post)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function addVoteForComment(comment_id, vote) {
    return (dispatch) => {
        // optimistic update: reflect new state immediately
        dispatch(voteForCommentAdded(comment_id, vote));
        doPost(`comments/${comment_id}`, {option: vote > 0 ? 'upVote' : 'downVote'})
        .then(response => response.json())
        .then(comment => dispatch(commentUpdated(comment)))
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

export function deletePost(id) {
    return (dispatch) => {
        dispatch(postDeleted(id));
        doDelete(`posts/${id}`)
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function addComment(comment) {
    return (dispatch) => {
        comment.id = uuid.v4();
        comment.timestamp = moment().valueOf();
        dispatch(commentUpdated(comment));
        doPost('comments', comment)
        .then(response => response.json())
        .then(json => dispatch(commentUpdated(json)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function saveComment(comment) {
    return (dispatch) => {
        dispatch(commentUpdated(comment));
        doPut(`comments/${comment.id}`, {body: comment.body, timestamp: moment().valueOf() })
        .then(response => response.json())
        .then(json => dispatch(commentUpdated(json)))
        .catch(e => {
            console.error(e);
            dispatch(fetchPosts());
        })
    }
}

export function deleteComment(id) {
    return (dispatch) => {
        dispatch(commentDeleted(id));
        doDelete(`comments/${id}`)
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
