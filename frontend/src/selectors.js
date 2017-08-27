const byTitle = (left, right) => {
    if (left.title < right.title) return -1;
    if (left.title > right.title) return +1;
    return 0;
}

export const visiblePosts = ({posts}) => Object.values(posts).sort(byTitle);