import moment from 'moment';
import uuid from 'uuid';

import {
  POSTS_REQUESTED,
  POSTS_RECEIVED,
  POST_UPDATED,
  POST_DELETED,
  ADD_VOTE_FOR_POST,
  EDIT_POST,
  EDIT_POST_FINISHED,
  SORT_POSTS
} from './types';

import {doGet, doPost, doPut, doDelete} from './fetch-helpers';

import {fetchComments} from './comments';

export const postsRequested = () => ({type: POSTS_REQUESTED});
export const postsReceived = posts => ({type: POSTS_RECEIVED, posts});
export const postUpdated = post => ({type: POST_UPDATED, post});
export const postDeleted = id => ({type: POST_DELETED, id});
export const voteForPostAdded = (postId, vote) => ({type: ADD_VOTE_FOR_POST, postId, vote});
export const editPost = post => ({type: EDIT_POST, post});
export const editPostFinished = () => ({type: EDIT_POST_FINISHED});

export function fetchPosts() {
  return (dispatch) => {
    dispatch(postsRequested());
    doGet('posts')
      .then(posts => {
        dispatch(postsReceived(posts));
        // need to fetch comments for each post so that number of comments can be displayed
        // too bad that there is no api to get all comments with one request
        posts.forEach(post => dispatch(fetchComments(post)));
      });
  };
}

export function addVoteForPost(postId, vote) {
  return (dispatch) => {
    // optimistic update: reflect new state immediately
    dispatch(voteForPostAdded(postId, vote));
    doPost(`posts/${postId}`, {option: vote > 0 ? 'upVote' : 'downVote'})
      .then(post => dispatch(postUpdated(post)))
      .catch(e => {
        console.error(e);
        dispatch(fetchPosts());
      });
  };
}

export function addPost(post) {
  return (dispatch) => {
    post.id = uuid.v4();
    post.timestamp = moment().valueOf();
    dispatch(postUpdated(post));
    doPost('posts', post)
      .then(json => dispatch(postUpdated(json)))
      .catch(e => {
        console.error(e);
        dispatch(fetchPosts());
      });
  };
}

export function savePost(post) {
  return (dispatch) => {
    dispatch(postUpdated(post));
    doPut(`posts/${post.id}`, {title: post.title, body: post.body})
      .then(json => dispatch(postUpdated(json)))
      .catch(e => {
        console.error(e);
        dispatch(fetchPosts());
      });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    dispatch(postDeleted(id));
    doDelete(`posts/${id}`)
      .catch(e => {
        console.error(e);
        dispatch(fetchPosts());
      });
  };
}

export const sortPosts = (sortField) => {
  switch (sortField) {
  case 'voteScore':
    return ({type: SORT_POSTS, sortField: 'voteScore', ascending: false});
  case 'author':
    return ({type: SORT_POSTS, sortField: 'author'});
  case 'category':
    return ({type: SORT_POSTS, sortField: 'category'});
  case 'timestamp':
    return ({type: SORT_POSTS, sortField: 'timestamp', ascending: false});
  default:
    throw new Error(`Unsupported sortField: ${sortField}`);
  }
};
