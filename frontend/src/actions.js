export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';

const categoriesReceived = categories => ({type: CATEGORIES_RECEIVED, categories});

function fetchWithAuthorization(path) {
    return fetch(`http://localhost:5001/${path}`, {
        headers: {
            Authorization: 'faked'
        }
    });
}

export function fetchCategories() {
    return (dispatch) => {
        fetchWithAuthorization('categories', {})
        .then(response => response.json())
        .then(json => dispatch(categoriesReceived(json.categories)));
    }
}