export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';
export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_UPDATED = 'POST_UPDATED';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_VOTE = 'ADD_VOTE';

const categoriesReceived = categories => ({ type: CATEGORIES_RECEIVED, categories });
const postsReceived = posts => ({ type: POSTS_RECEIVED, posts });
const postUpdated = post => ({ type: POST_UPDATED, post });
const commentsReceived = comments => ({ type: COMMENTS_RECEIVED, comments });
export const voteAdded = (post_id, vote) => ({ type: ADD_VOTE, post_id, vote });

function fetchWithAuthorization(path, options = {}) {
    options.headers = Object.assign({}, options.headers, {Authorization: 'faked'});
    return fetch(`http://localhost:5001/${path}`, options);
}

export function fetchCategories() {
    return (dispatch) => {
        fetchWithAuthorization('categories')
            .then(response => response.json())
            .then(json => dispatch(categoriesReceived(json.categories)));
    }
}

export function fetchPosts() {
    return (dispatch) => {
        fetchWithAuthorization('posts')
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
        fetchWithAuthorization(path)
            .then(response => response.json())
            .then(comments => dispatch(commentsReceived(comments)));
    }
}

export function addVote(post_id, vote) {
    return (dispatch) => {
        // optimistic update: reflect new state immediately
        dispatch(voteAdded(post_id, vote));
        fetchWithAuthorization(`posts/${post_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({option: vote > 0 ? 'upVote' : 'downVote'})
        })
        .then(response => response.json())
        .then(post => dispatch(postUpdated(post)))
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
