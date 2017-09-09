import {
  ADD_VOTE_FOR_POST,
  POST_DELETED,
  POSTS_RECEIVED,
  POST_UPDATED
} from '../actions';

export default function posts(state = {}, action) {
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
  case ADD_VOTE_FOR_POST:
    const originalPost = state[action.post_id];
    if (originalPost) {
      const updatedPost = {
        ...originalPost,
        voteScore: originalPost.voteScore += action.vote
      };
      return {...state, [action.post_id]: updatedPost};
    }
    return state;
  default:
    return state;
  }
}
