import {combineReducers} from 'redux';
import {
  ADD_VOTE_FOR_POST,
  CATEGORIES_RECEIVED,
  COMMENTS_RECEIVED,
  COMMENT_DELETED,
  COMMENT_UPDATED,
  EDIT_COMMENT,
  EDIT_COMMENT_FINISHED,
  EDIT_POST,
  EDIT_POST_FINISHED,
  FORM_VALIDATION_FAILED,
  POST_DELETED,
  POSTS_RECEIVED,
  POSTS_REQUESTED,
  POST_UPDATED,
  SORT_POSTS
} from './actions';

export function categories(state = [], action) {
  switch (action.type) {
  case CATEGORIES_RECEIVED:
    return action.categories;
  default:
    return state;
  }
}

export function posts(state = {}, action) {
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

export function comments(state = {}, action) {
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

const defaultUiState = {
  sortField: 'voteScore',
  sortAscending: false,
  isLoadingPosts: false,
  currentlyEditedComment: undefined,
  currentlyEditedPost: undefined,
  formValidationErrors: undefined
};

export function postsApp(state = defaultUiState, action) {
  switch (action.type) {
  case POSTS_REQUESTED:
    return {
      ...state,
      isLoadingPosts: true
    };
  case POSTS_RECEIVED:
    return {
      ...state,
      isLoadingPosts: false
    };
  case SORT_POSTS:
    return {
      ...state,
      sortField: action.sortField,
      sortAscending: action.ascending
    };
  case EDIT_COMMENT:
    return {
      ...state,
      currentlyEditedComment: action.comment
    };
  case EDIT_COMMENT_FINISHED:
    return {
      ...state,
      currentlyEditedComment: undefined,
      formValidationErrors: undefined
    };
  case EDIT_POST:
    return {
      ...state,
      currentlyEditedPost: action.post
    };
  case EDIT_POST_FINISHED:
    return {
      ...state,
      currentlyEditedPost: undefined,
      formValidationErrors: undefined
    };
  case FORM_VALIDATION_FAILED:
    return {
      ...state,
      formValidationErrors: action.messages
    };
  default:
    return state;
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
  postsApp
});