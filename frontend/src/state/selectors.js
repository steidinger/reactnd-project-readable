function byField(sortField, ascending = true) {
  return function (left, right) {
    let result = 0;
    if (left[sortField] < right[sortField]) result = -1;
    if (left[sortField] > right[sortField]) result = +1;

    return ascending ? result : result * -1;
  };
}

export const postById = ({posts, comments}, id) =>
  Object.assign({}, posts[id], {comments: visibleComments(comments, {id})});

export const visibleComments = (comments, {id}) =>
  Object.values(comments).filter(c => c.parentId === id).sort(byField('timestamp', false));

export const visiblePosts = ({posts, comments, postsApp}, filterCategory) =>
  Object.keys(posts)
    .map(id => postById({posts, comments}, id))
    .filter(post => !filterCategory || post.category === filterCategory)
    .sort(byField(postsApp.sortField, postsApp.sortAscending));
