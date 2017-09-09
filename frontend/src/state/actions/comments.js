import moment from 'moment';
import uuid from 'uuid';

import {
  COMMENTS_RECEIVED,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  ADD_VOTE_FOR_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENT_FINISHED
} from './types';

import {doGet, doPost, doPut, doDelete} from './fetch-helpers';

export const commentsReceived = comments => ({type: COMMENTS_RECEIVED, comments});
export const commentUpdated = comment => ({type: COMMENT_UPDATED, comment});
export const commentDeleted = id => ({type: COMMENT_DELETED, id});
export const voteForCommentAdded = (commentId, vote) => ({type: ADD_VOTE_FOR_COMMENT, commentId, vote});
export const editComment = comment => ({type: EDIT_COMMENT, comment});
export const editCommentFinished = () => ({type: EDIT_COMMENT_FINISHED});

export function fetchComments(post) {
  return (dispatch) => {
    const path = `posts/${post.id}/comments`;
    doGet(path)
      .then(response => response.json())
      .then(comments => dispatch(commentsReceived(comments)));
  };
}

export function addVoteForComment(commentId, vote) {
  return (dispatch) => {
    // optimistic update: reflect new state immediately
    dispatch(voteForCommentAdded(commentId, vote));
    doPost(`comments/${commentId}`, {option: vote > 0 ? 'upVote' : 'downVote'})
      .then(response => response.json())
      .then(comment => dispatch(commentUpdated(comment)))
      .catch(e => {
        console.error(e);
      });
  };
}


export function addComment(comment) {
  return (dispatch) => {
    comment.id = uuid.v4();
    comment.timestamp = moment().valueOf();
    dispatch(commentUpdated(comment));
    doPost('comments', comment)
      .then(response => response.json())
      .then(json => dispatch(commentUpdated(json)))
      .catch(e => {
        console.error(e);
      });
  };
}

export function saveComment(comment) {
  return (dispatch) => {
    dispatch(commentUpdated(comment));
    doPut(`comments/${comment.id}`, {body: comment.body, timestamp: moment().valueOf()})
      .then(response => response.json())
      .then(json => dispatch(commentUpdated(json)))
      .catch(e => {
        console.error(e);
      });
  };
}

export function deleteComment(id) {
  return (dispatch) => {
    dispatch(commentDeleted(id));
    doDelete(`comments/${id}`)
      .catch(e => {
        console.error(e);
      });
  };
}
