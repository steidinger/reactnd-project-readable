function byField(sortField, ascending = true) {
    return function (left, right) {
        let result = 0;
        if (left[sortField] < right[sortField]) result = -1;
        if (left[sortField] > right[sortField]) result = +1;

        return ascending ? result : result * -1;
    }
}

export const postById = ({posts}, id) => posts[id];

export const visibleComments = ({comments}, {id}) => Object.values(comments).filter(c => c.parentId === id).sort(byField('timestamp', false));

export const visiblePosts = ({ posts, postsApp }) =>
    Object.values(posts).sort(byField(postsApp.sortField, postsApp.sortAscending));