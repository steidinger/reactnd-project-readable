import {
  EDIT_COMMENT,
  EDIT_COMMENT_FINISHED,
  EDIT_POST,
  EDIT_POST_FINISHED,
  FORM_VALIDATION_FAILED,
  POSTS_RECEIVED,
  POSTS_REQUESTED,
  SORT_POSTS
} from '../actions';

const defaultUiState = {
  sortField: 'voteScore',
  sortAscending: false,
  isLoadingPosts: false,
  currentlyEditedComment: undefined,
  currentlyEditedPost: undefined,
  formValidationErrors: undefined
};

export default function ui(state = defaultUiState, action) {
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
