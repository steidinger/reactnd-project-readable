import {
  COMMENTS_RECEIVED,
  COMMENT_DELETED,
  COMMENT_UPDATED
} from '../actions';

export default function comments(state = {}, action) {
  switch (action.type) {
  case COMMENTS_RECEIVED:
    const received = action.comments.reduce((collector, c) => {
      collector[c.id] = c;
      return collector;
    }, {});
    return {...state, ...received};
  case COMMENT_UPDATED:
    return {...state, [action.comment.id]: action.comment};
  case COMMENT_DELETED:
    return Object.keys(state)
      .filter(id => id !== action.id)
      .reduce((newState, id) => {
        newState[id] = state[id];
        return newState;
      }, {});
  default:
    return state;
  }
}

