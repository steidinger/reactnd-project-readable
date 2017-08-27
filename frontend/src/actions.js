export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';

const categoriesReceived = categories => ({type: CATEGORIES_RECEIVED, categories});
const postsReceived = posts => ({type: POSTS_RECEIVED, posts});

function fetchWithAuthorization(path) {
    return fetch(`http://localhost:5001/${path}`, {
        headers: {
            Authorization: 'faked'
        }
    });
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
        .then(posts => dispatch(postsReceived(posts)));
    }
}